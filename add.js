document.addEventListener('DOMContentLoaded', () => {
      const toggleSidebar = document.getElementById('toggleSidebar');
      const sidebar = document.querySelector('.sidebar');
      toggleSidebar.addEventListener('click', () => {
          sidebar.classList.toggle('open'); // Toggle the open class
          sidebar.classList.toggle('collapsed'); // Add/remove the collapsed class
      });
});
document.getElementById('saveBtn').addEventListener('click', () => {
      // Get form data
      const propertyName = document.getElementById('propertyName').value;
      const propertyLocation = document.getElementById('propertyLocation').value;
      const propertyDescription = document.getElementById('propertyDescription').value;
      const imageURL = document.getElementById('imageURL').value; // New Image URL field
      const propertyType = document.querySelector('input[name="propertyType"]:checked').value;
      const priceRent = document.getElementById('priceRent').value;
      const propertyAddress = document.getElementById('propertyAddress').value;
      const bedrooms = document.getElementById('bedrooms').value;
      const squareFeet = document.getElementById('squareFeet').value;
      const carParking = document.getElementById('carParking').value;
      const yearBuilt = document.getElementById('yearBuilt').value;
    
      // Create data object
      const propertyData = {
        propertyName,
        propertyLocation,
        propertyDescription,
        imageURL,
        propertyType,
        priceRent,
        propertyAddress,
        bedrooms,
        squareFeet,
        carParking,
        yearBuilt
      };
    
      // Send data to the local server
      fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(propertyData)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Property data saved successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error saving data.');
      });
    });
    