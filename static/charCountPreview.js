document.addEventListener('DOMContentLoaded', function() {
    // Esta función se ejecutará cuando el documento esté completamente cargado
    const textarea = document.getElementById('description');
    updateCharCount(textarea); // Actualiza el contador al inicio con el contenido actual del textarea
});

function updateCharCount(textarea) {
    const maxLength = 500;
    const currentLength = textarea.value.length;
    const charCountElement = document.getElementById('charCount');

    charCountElement.textContent = `${currentLength}/${maxLength}`;

    if (currentLength > maxLength) {
        charCountElement.style.color = 'red'; // Cambia el color del contador si se supera el límite
    } else {
        charCountElement.style.color = ''; // Restaura el color por defecto
    }
}