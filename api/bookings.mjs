import { readFile } from 'node:fs/promises';

const SUPABASE_URL = 'https://cceshuvaqcnqahckqnkd.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { field_id, slot_id, booking_date, organizer_name, organizer_phone } = req.body ?? {};
  if (typeof organizer_name !== 'string' || !organizer_name.trim() || organizer_name.trim().length > 100 ||
      typeof organizer_phone !== 'string' || !organizer_phone.trim() || organizer_phone.trim().length > 20) {
    return res.status(400).json({ error: 'Ingresa tu nombre y teléfono.' });
  }
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());
  if (booking_date !== today) {
    return res.status(400).json({ error: 'La fecha cambió. Recarga la página para revisar el horario.' });
  }
  if (!process.env.SUPABASE_SERVICE_KEY) {
    return res.status(500).json({ error: 'No se pudo guardar la reserva.' });
  }
  try {
    const fields = JSON.parse(await readFile(new URL('../data/fields.json', import.meta.url), 'utf8'));
    const field = fields.find(item => item.id === field_id);
    const slot = field?.slots.find(item => item.id === slot_id && item.status === 'available');
    if (!slot) return res.status(400).json({ error: 'Elige un horario disponible de esta cancha.' });
    const times = slot.time.split(' - ').map(time => {
      const [, hour, minute, period] = time.match(/^(\d{1,2}):(\d{2}) (AM|PM)$/);
      return `${today}T${String(Number(hour) % 12 + (period === 'PM' ? 12 : 0)).padStart(2, '0')}:${minute}:00-06:00`;
    });
    const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings?select=booking_number,status`, {
      method: 'POST',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation'
      },
      body: JSON.stringify({
        field_id: field.id, slot_id: slot.id, field_name: field.name,
        starts_at: times[0], ends_at: times[1], price: field.pricePerHour, currency: field.currency,
        organizer_name: organizer_name.trim(), organizer_phone: organizer_phone.trim(), status: 'pending'
      })
    });
    if (!response.ok) return res.status(502).json({ error: 'No se pudo guardar la reserva.' });
    const [booking] = await response.json();
    if (!booking?.booking_number || !['pending', 'confirmed', 'cancelled'].includes(booking.status)) {
      throw new Error('Invalid insert response');
    }
    return res.status(201).json({ booking_number: booking.booking_number, status: booking.status });
  } catch {
    return res.status(502).json({ error: 'No pudimos verificar el resultado. Contacta a la cancha antes de intentar de nuevo.' });
  }
}
