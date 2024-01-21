document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const cards = document.querySelectorAll('.card');

    searchBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.toLowerCase();

        cards.forEach(function(card) {
            const title = card.querySelector('h3');
            const priority = card.querySelector('.priority');
            const status = card.querySelector('.status');

            const titleText = title.textContent.toLowerCase();
            const priorityText = priority.textContent.toLowerCase();
            const statusText = status.textContent.toLowerCase();

            // Verifica si el término de búsqueda está presente en el título, prioridad o estado
            const isMatch = titleText.includes(searchTerm) || priorityText.includes(searchTerm) || statusText.includes(searchTerm);

            // Muestra u oculta la tarjeta según si hay coincidencia con el término de búsqueda
            card.style.display = isMatch ? 'block' : 'none';
        });
    });
});
