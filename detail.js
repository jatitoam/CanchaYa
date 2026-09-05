document.addEventListener('DOMContentLoaded', async () => {
    const contentContainer = document.getElementById('field-detail-content');
    
    // Get field ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const fieldId = urlParams.get('id');

    if (!fieldId) {
        showError('No pudimos encontrar esa cancha. Regresa a la lista de canchas.');
        return;
    }

    try {
        const response = await fetch('./data/fields.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allFields = await response.json();
        const field = allFields.find(f => f.id === fieldId);

        if (!field) {
            showError('No pudimos encontrar esa cancha. Regresa a la lista de canchas.');
            return;
        }

        renderFieldDetail(field);

    } catch (error) {
        console.error('Error loading field details:', error);
        showError(`No pudimos cargar los datos en este momento. Por favor intenta de nuevo.`);
    }

    function renderFieldDetail(field) {
        document.getElementById('field-contact-link').href = `contact.html?id=${encodeURIComponent(field.id)}`;
        
        contentContainer.innerHTML = `
            <div class="row g-4">
                <div class="col-lg-8">
                    <article class="detail-card">
                        <img src="img/demo-futbol.jpg" alt="${field.name}" class="mb-4">
                        <div class="detail-card-body">
                        <h2 class="display-5 mb-1">${field.name}</h2>
                        <p class="text-muted mb-4 fs-5">
                            <i class="bi bi-geo-alt"></i> ${field.neighborhood} &bull; ${field.address}
                        </p>

                        <div class="row mb-4 g-3">
                            <div class="col-6 col-md-3">
                                <div class="info-badge">
                                    <small>SUPERFICIE</small>
                                    <div>${field.surfaceType}</div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="info-badge">
                                    <small>TAMAÑO</small>
                                    <div>${field.size}</div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="info-badge">
                                    <small>CALIFICACIÓN</small>
                                    <div>${field.rating} <span class="text-warning">★</span></div>
                                </div>
                            </div>
                            <div class="col-6 col-md-3">
                                <div class="info-badge highlight">
                                    <small>PRECIO / HORA</small>
                                    <div class="text-accent">$${field.pricePerHour}</div>
                                </div>
                            </div>
                </div>

                        <div class="mb-5">
                            <h3 class="h5 mb-3">Servicios y Amenidades</h3>
                            <div class="d-flex flex-wrap gap-2">
                                ${field.amenities.map(amenity => `
                                    <span class="amenity-tag">${amenity}</span>
                                `).join('')}
                            </div>
                        </div>

                        <section class="slots-section">
                            <h3 class="h4 mb-3">Horarios disponibles para hoy</h3>
                            ${renderSlots(field)}

                        </section>
                        </div>
                    </article>
                </div>
                
                <div class="col-lg-4">
                    <aside class="contact-sidebar p-4 sticky-top" style="top: 2rem;">
                        <h3 class="h5 mb-3">¿Ya tienes una reserva?</h3>
                        <p class="mb-4">Contacta a la cancha para consultar sobre tu reserva existente.</p>
                        <p>Teléfono: <a href="tel:${field.contactPhone.replace(/[^+0-9]/g, '')}">${field.contactPhone}</a></p>
                        <a href="contact.html?id=${encodeURIComponent(field.id)}" class="btn btn-primary w-100 py-3 fw-bold">CONTACTAR A ESTA CANCHA</a>
                    </aside>
                </div>
            </div>
        `;
    }

    function renderSlots(field) {
        if (!field.slots || field.slots.length === 0) {
            return `<div class="alert alert-info">No hay horarios publicados para hoy. Llama a la cancha para preguntar.</div>`;
        }

        return `<div class="list-group">${field.slots.map(slot => {
            const available = slot.status === 'available';
            const tag = available ? 'a' : 'div';
            const href = available
                ? ` href="booking.html?id=${encodeURIComponent(field.id)}&slot=${encodeURIComponent(slot.id)}"`
                : '';
            return `<${tag}${href} class="list-group-item ${available ? 'list-group-item-action' : ''} d-flex justify-content-between align-items-center py-3">
                <span class="slot-time fw-bold">${slot.time}</span>
                <span class="badge ${available ? 'bg-accent' : 'bg-secondary'} rounded-pill px-3 py-2">
                    ${available ? 'RESERVAR' : 'OCUPADO'}
                </span>
            </${tag}>`;
        }).join('')}</div>`;
    }

    function showError(message) {
        contentContainer.innerHTML = `
            <div class="alert alert-warning text-center py-5" role="alert">
                <p class="mb-4 fs-5">${message}</p>
                <a href="index.html" class="btn btn-dark">Volver a la lista de canchas</a>
            </div>
        `;
    }
});
