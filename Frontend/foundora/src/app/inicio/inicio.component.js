document.getElementById('reportForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const objectType = document.getElementById('objectType').value;
    const description = document.getElementById('description').value;
    const lostDate = document.getElementById('lostDate').value;
    const location = document.getElementById('location').value;
    const photo = document.getElementById('photo').files[0];

    if (!email || !objectType || !description || !lostDate || !location) {
        alert('Por favor completa todos los campos requeridos.');
        return;
    }

    alert('Objeto perdido reportado exitosamente.\nPronto nos pondremos en contacto.');

    // Puedes enviar los datos a un servidor usando fetch o AJAX aquí si lo deseas
});

document.querySelector('.search-btn').addEventListener('click', function() {
    const searchText = document.getElementById('searchText').value;
    const category = document.getElementById('categoryFilter').value;
    const location = document.getElementById('locationFilter').value;

    alert(`Buscando:\nDescripción: ${searchText}\nCategoría: ${category}\nUbicación: ${location}`);
});
