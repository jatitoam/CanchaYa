document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const status = document.getElementById('booking-status');
    const back = document.getElementById('back-to-field');

    const bookingDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Guatemala' }).format(new Date());

    try {
        const response = await fetch('./data/fields.json');
        if (!response.ok) throw new Error('Could not load fields');
        const fields = await response.json();
        const field = fields.find(item => item.id === params.get('id'));
        if (!field) {
            status.textContent = 'No pudimos encontrar esa cancha. Regresa a la lista de canchas.';
            return;
        }
        back.href = `field-detail.html?id=${encodeURIComponent(field.id)}`;
        back.textContent = '← Volver a la cancha';
        const slot = field.slots.find(item => item.id === params.get('slot'));
        if (!slot || slot.status !== 'available') {
            status.textContent = 'Este horario no está disponible. Vuelve a la cancha y elige otro.';
            return;
        }
        document.getElementById('booking-field').textContent = field.name;
        document.getElementById('booking-time').textContent = slot.time;
        document.getElementById('booking-price').textContent = new Intl.NumberFormat('es-GT', {
            style: 'currency', currency: field.currency
        }).format(field.pricePerHour);
        status.hidden = true;
        const form = document.getElementById('booking-review');
        const submit = document.getElementById('booking-submit');
        form.hidden = false;
        let saving = false;
        form.addEventListener('submit', async event => {
            event.preventDefault();
            if (saving || !form.reportValidity()) return;
            saving = true;
            submit.disabled = true;
            status.hidden = true;
            try {
                const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        field_id: field.id, slot_id: slot.id, booking_date: bookingDate,
                        organizer_name: document.getElementById('booking-name').value.trim(),
                        organizer_phone: document.getElementById('booking-phone').value.trim()
                    })
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.error || 'No se pudo guardar la reserva.');
                if (!result.booking_number || !['pending', 'confirmed', 'cancelled'].includes(result.status)) {
                    throw new Error('No pudimos verificar el resultado. Contacta a la cancha antes de intentar de nuevo.');
                }
                document.getElementById('confirmation-number').textContent = result.booking_number;
                document.getElementById('confirmation-status').textContent = result.status;
                document.getElementById('booking-heading').textContent = 'Resultado de tu reserva';
                form.hidden = true;
                const confirmation = document.getElementById('booking-confirmation');
                confirmation.hidden = false;
                confirmation.focus();
            } catch (error) {
                status.textContent = error.message || 'No pudimos verificar el resultado. Contacta a la cancha antes de intentar de nuevo.';
                status.hidden = false;
                saving = false;
                submit.disabled = false;
            }
        });
    } catch (error) {
        status.textContent = 'No pudimos cargar los datos en este momento. Por favor intenta de nuevo.';
    }
});
