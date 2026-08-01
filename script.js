document.addEventListener('DOMContentLoaded', async () => {
    const fieldsContainer = document.getElementById('fields-container');
    const surfaceFilter = document.getElementById('surface-filter');

    let allFields = [];

    try {
        const response = await fetch('./data/fields.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allFields = await response.json();

        // Populate surface filter dropdown
        const surfaceTypes = [...new Set(allFields.map(field => field.surfaceType))].sort();
        surfaceTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            surfaceFilter.appendChild(option);
        });

        // Initial render
        renderFields(allFields);

        // Filter event listener
        surfaceFilter.addEventListener('change', (e) => {
            const selectedType = e.target.value;
            const filteredFields = selectedType === 'All' 
                ? allFields 
                : allFields.filter(field => field.surfaceType === selectedType);
            renderFields(filteredFields);
        });

    } catch (error) {
        console.error('Error loading fields:', error);
        fieldsContainer.innerHTML = `<p>Error loading data: ${error.message}</p>`;
    }

    function renderFields(fields) {
        fieldsContainer.innerHTML = '';
        
        if (fields.length === 0) {
            fieldsContainer.innerHTML = '<p>No fields found for this selection.</p>';
            return;
        }

        fields.forEach(field => {
            const card = document.createElement('article');
            card.className = 'field-card';
            
            card.innerHTML = `
                <h2>${field.name}</h2>
                <p class="neighborhood">${field.neighborhood}</p>
                <p><span class="surface-type">${field.surfaceType}</span></p>
                <p class="price">$${field.pricePerHour}/hour</p>
            `;
            
            fieldsContainer.appendChild(card);
        });
    }
});
