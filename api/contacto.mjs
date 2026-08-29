const SUPABASE_URL = 'https://cceshuvaqcnqahckqnkd.supabase.co';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!serviceKey) {
    return res.status(500).json({ error: 'SUPABASE_SERVICE_KEY is not configured' });
  }

  const { nombre, telefono, cancha, hora_solicitada } = req.body ?? {};

  try {
    const supabaseResponse = await fetch(`${SUPABASE_URL}/rest/v1/mensajes_contacto`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({ nombre, telefono, cancha, hora_solicitada }),
    });

    if (!supabaseResponse.ok) {
      return res.status(supabaseResponse.status).json(await supabaseResponse.json());
    }

    return res.status(201).json({ ok: true, mensaje: 'Solicitud enviada correctamente.' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
