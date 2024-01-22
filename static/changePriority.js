document.addEventListener('DOMContentLoaded', function() {
    // Esta función se ejecutará cuando el documento esté completamente cargado
    changeStatusColor();
    changePriorityColor();
});

function changeStatusColor() {
    const statusDropdown = document.getElementById('status');
    const statusContainer = document.getElementById('statusContainer');

    statusContainer.classList.toggle('todo-selected', statusDropdown.value === 'ToDo');
    statusContainer.classList.toggle('doing-selected', statusDropdown.value === 'Doing');
    statusContainer.classList.toggle('done-selected', statusDropdown.value === 'Done');
}

function changePriorityColor() {
    const priorityDropdown = document.getElementById('priority');
    const priorityContainer = document.getElementById('priorityContainer');

    priorityContainer.classList.toggle('high-selected', priorityDropdown.value === 'Alta');
    priorityContainer.classList.toggle('medium-selected', priorityDropdown.value === 'Media');
    priorityContainer.classList.toggle('low-selected', priorityDropdown.value === 'Baja');
}