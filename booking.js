document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const status = document.getElementById('booking-status');
    const back = document.getElementById('back-to-field');

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
        document.getElementById('booking-review').hidden = false;
    } catch (error) {
        status.textContent = 'No pudimos cargar los datos en este momento. Por favor intenta de nuevo.';
    }
});
