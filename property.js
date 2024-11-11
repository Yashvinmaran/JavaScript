document.addEventListener('DOMContentLoaded', () => {
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebar.classList.toggle('collapsed');
    });

    // Function to display properties
    const displayProperties = (data) => {
        const propertyContainer = document.querySelector('#property');
        propertyContainer.innerHTML = ''; // Clear previous content

        if (Array.isArray(data) && data.length > 0) {
            data.map(property => {
                const propertyCardHTML = `
                  <div class="property-card" data-id="${property.id}">
                      <img src="${property.imageURL || 'default-image.jpg'}" alt="Property Image" class="property-image">
                      <div class="property-details">
                          <h3>${property.propertyName || 'No Name'}, ${property.propertyLocation || 'No Location'}</h3>
                          <p class="property-price">$${property.priceRent || 'N/A'}</p>
                          <p class="property-description">${property.propertyDescription || 'No Description Available'}</p>
                          <ul class="property-features">
                              <li><i class="fas fa-bed"></i> ${property.bedrooms || 'N/A'} Bedrooms</li>
                              <li><i class="fas fa-car"></i> ${property.carParking || 'N/A'} Car Parking</li>
                              <li><i class="fas fa-ruler"></i> ${property.squareFeet || 'N/A'} sqft</li>
                              <li><i class="fas fa-calendar"></i> Built in ${property.yearBuilt || 'N/A'}</li>
                          </ul>
                          <button class="delete-btn">Delete</button>
                          <button class="update-btn">Update</button>
                      </div>
                  </div>
                `;

                propertyContainer.innerHTML += propertyCardHTML;
            });

            // Attach event listeners for delete and update buttons
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });

            document.querySelectorAll('.update-btn').forEach(button => {
                button.addEventListener('click', handleUpdate);
            });
        } else {
            propertyContainer.innerHTML = '<p>No properties available at the moment.</p>';
        }
    };

    // Fetch properties from the server
    const fetchProperties = () => {
        fetch("http://localhost:4000/products")
            .then(response => response.json())
            .then(data => displayProperties(data))
            .catch(error => {
                console.error('Error fetching properties:', error);
                const propertyContainer = document.querySelector('#property');
                propertyContainer.innerHTML = '<p>Error loading properties. Please try again later.</p>';
            });
    };

    // Handle property deletion
    const handleDelete = (event) => {
        const propertyCard = event.target.closest('.property-card');
        const propertyId = propertyCard.getAttribute('data-id');

        fetch(`http://localhost:4000/products/${propertyId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                propertyCard.remove(); // Remove property from DOM
            } else {
                alert('Failed to delete the property. Please try again.');
            }
        })
        .catch(error => console.error('Error deleting property:', error));
    };

    // Handle property update
    const handleUpdate = (event) => {
        const propertyCard = event.target.closest('.property-card');
        const propertyId = propertyCard.getAttribute('data-id');

        // Create an editable form for updating
        propertyCard.innerHTML = `
            <div class="update-form">
                <input type="text" id="updateName" placeholder="Property Name" value="${propertyCard.querySelector('h3').innerText}">
                <input type="text" id="updateLocation" placeholder="Location" value="${propertyCard.querySelector('.property-details h3').innerText.split(', ')[1] || ''}">
                <input type="number" id="updatePrice" placeholder="Price" value="${propertyCard.querySelector('.property-price').innerText.slice(1) || ''}">
                <textarea id="updateDescription" placeholder="Description">${propertyCard.querySelector('.property-description').innerText || ''}</textarea>
                <button id="saveUpdate">Save</button>
            </div>
        `;

        // Save the updated property details
        document.getElementById('saveUpdate').addEventListener('click', () => {
            const updatedData = {
                propertyName: document.getElementById('updateName').value,
                propertyLocation: document.getElementById('updateLocation').value,
                priceRent: document.getElementById('updatePrice').value,
                propertyDescription: document.getElementById('updateDescription').value
            };

            fetch(`http://localhost:4000/products/${propertyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => response.json())
            .then(updatedProperty => {
                // Display updated property card
                displayProperties([updatedProperty]); // Replace card content with updated property
            })
            .catch(error => console.error('Error updating property:', error));
        });
    };

    // Initial fetch
    fetchProperties();
});
