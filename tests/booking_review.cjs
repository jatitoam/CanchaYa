// Run with: node tests/booking_review.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const fields = JSON.parse(fs.readFileSync('data/fields.json', 'utf8'));

async function render(script, search, data = fields, ok = true) {
    const elements = {};
    const requests = [];
    let ready;
    const document = {
        addEventListener: (_, callback) => { ready = callback; },
        getElementById: id => elements[id] ||= { hidden: id === 'booking-review' }
    };
    vm.runInNewContext(fs.readFileSync(script, 'utf8'), {
        document, window: { location: { search } }, URLSearchParams, Intl, console,
        fetch: async (url, options) => {
            requests.push({ url, options });
            assert.equal(url, './data/fields.json');
            assert.equal(options, undefined, 'Only read requests are allowed');
            return { ok, json: async () => data };
        }
    });
    await ready();
    assert.equal(requests.length, 1);
    return elements;
}

(async () => {
    for (const field of fields) {
        const detail = await render('detail.js', `?id=${field.id}`);
        const html = detail['field-detail-content'].innerHTML;
        assert.ok(html.includes(field.contactPhone));
        assert.ok(html.includes(`contact.html?id=${field.id}`));
        for (const slot of field.slots) {
            const query = `?id=${field.id}&slot=${slot.id}`;
            assert.equal(html.includes(`booking.html${query}`), slot.status === 'available');
            const review = await render('booking.js', query);
            if (slot.status === 'available') {
                assert.equal(review['booking-review'].hidden, false);
                assert.equal(review['booking-field'].textContent, field.name);
                assert.equal(review['booking-time'].textContent, slot.time);
                assert.equal(review['booking-price'].textContent, new Intl.NumberFormat('es-GT', {
                    style: 'currency', currency: field.currency
                }).format(field.pricePerHour));
            } else assert.equal(review['booking-review'], undefined);
        }
    }
    for (const query of ['', '?id=unknown', '?id=field_01', '?id=field_01&slot=slot_02_1', '?id=field_01&slot=unknown']) {
        const result = await render('booking.js', query);
        assert.equal(result['booking-review'], undefined);
        assert.ok(result['booking-status'].textContent);
    }
    const failed = await render('booking.js', '?id=field_01&slot=slot_01_1', fields, false);
    assert.match(failed['booking-status'].textContent, /No pudimos cargar/);
    const empty = await render('detail.js', '?id=field_01', [{ ...fields[0], slots: [] }]);
    assert.match(empty['field-detail-content'].innerHTML, /No hay horarios publicados/);
    assert.ok(empty['field-detail-content'].innerHTML.includes(fields[0].contactPhone));
    const html = fs.readFileSync('booking.html', 'utf8');
    assert.equal((html.match(/<input /g) || []).length, 2);
    assert.ok(!/<form|type="submit"/.test(html));
    console.log('Booking review checks passed: all slots, invalid selections, load failure, no writes.');
})().catch(error => { console.error(error); process.exitCode = 1; });
