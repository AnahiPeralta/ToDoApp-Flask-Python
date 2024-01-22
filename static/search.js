document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const cards = document.querySelectorAll('.card');

    const removeAccents = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const includesSearchTerm = (text, searchTerm) => removeAccents(text).toLowerCase().includes(removeAccents(searchTerm).toLowerCase());

    const performSearch = () => {
        const searchTerm = searchInput.value;

        cards.forEach(function(card) {
            const title = card.querySelector('h3');
            const priority = card.querySelector('.priority');
            const status = card.querySelector('.status');

            const isMatch = includesSearchTerm(title.textContent, searchTerm) ||
                            includesSearchTerm(priority.textContent, searchTerm) ||
                            includesSearchTerm(status.textContent, searchTerm);

            card.style.display = isMatch ? 'block' : 'none';
        });
    };

    // Función para manejar la tecla Enter
    const handleEnterKeyPress = (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    };

    // Agregar el evento de clic al botón de búsqueda
    searchBtn.addEventListener('click', performSearch);

    // Agregar el evento de tecla al input de búsqueda
    searchInput.addEventListener('keyup', handleEnterKeyPress);
});