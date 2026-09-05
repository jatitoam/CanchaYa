// Run: node tests/booking_save.mjs
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import handler from '../api/bookings.mjs';

process.env.SUPABASE_SERVICE_KEY = 'test-key';
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
const body = { field_id: 'field_01', slot_id: 'slot_01_1', booking_date: date,
  organizer_name: ' Test ', organizer_phone: ' +502 5555-0000 ', price: 1, status: 'confirmed' };
let writes = 0;
globalThis.fetch = async (url, options) => {
  writes++;
  assert.equal(url, 'https://cceshuvaqcnqahckqnkd.supabase.co/rest/v1/bookings?select=booking_number,status');
  assert.equal(options.method, 'POST');
  assert.equal(options.headers.Prefer, 'return=representation');
  const saved = JSON.parse(options.body);
  assert.equal(saved.status, 'pending');
  assert.equal(saved.price, 45);
  assert.equal(saved.organizer_name, 'Test');
  assert.equal(saved.starts_at, `${date}T14:00:00-06:00`);
  assert.equal(saved.ends_at, `${date}T15:00:00-06:00`);
  assert.ok(!('booking_number' in saved));
  return { ok: true, json: async () => [{ booking_number: 731, status: 'pending' }] };
};
async function call(body, method = 'POST') {
  const res = { status(code) { this.code = code; return this; }, json(value) { this.value = value; return this; } };
  await handler({ method, body }, res);
  return res;
}
assert.deepEqual((await call(body)).value, { booking_number: 731, status: 'pending' });
assert.equal(writes, 1, 'Insert response requires no lookup');
for (const change of [{ slot_id: 'slot_02_1' }, { slot_id: 'slot_01_2' }, { organizer_name: ' ' }, { booking_date: '2000-01-01' }]) {
  assert.equal((await call({ ...body, ...change })).code, 400);
}
assert.equal((await call(body, 'GET')).code, 405);
assert.equal(writes, 1);
globalThis.fetch = async () => ({ ok: false });
assert.equal((await call(body)).code, 502);

// Exercise the page with deliberately different returned statuses: never hardcode pending.
for (const [returnedStatus, expectedLabel] of [['pending', 'Pendiente'], ['confirmed', 'Confirmada'], ['cancelled', 'Cancelada']]) {
  const elements = {};
  let ready;
  const requests = [];
  const document = {
    addEventListener(_, callback) { ready = callback; },
    getElementById(id) { return elements[id] ||= {
      value: 'Test', hidden: true, reportValidity: () => true, focus() {},
      addEventListener(_, callback) { this.submit = callback; }
    }; }
  };
  vm.runInNewContext(readFileSync('booking.js', 'utf8'), {
    document, URLSearchParams, Intl, Date,
    window: { location: { search: '?id=field_01&slot=slot_01_1' } },
    fetch: async (url, options) => {
      requests.push(url);
      if (url === './data/fields.json') return { ok: true, json: async () => JSON.parse(readFileSync('data/fields.json')) };
      assert.equal(url, '/api/bookings');
      assert.equal(options.method, 'POST');
      return { ok: true, json: async () => ({ booking_number: 982, status: returnedStatus }) };
    }
  });
  await ready();
  await elements['booking-review'].submit({ preventDefault() {} });
  assert.equal(elements['confirmation-number'].textContent, 982);
  assert.equal(elements['confirmation-status'].textContent, expectedLabel);
  assert.equal(elements['booking-confirmation'].hidden, false);
  await elements['booking-review'].submit({ preventDefault() {} });
  assert.deepEqual(requests, ['./data/fields.json', '/api/bookings']);
}
console.log('Booking save checks passed: pending insert, returned number/status, validation, failures, no lookup or duplicate submit.');
