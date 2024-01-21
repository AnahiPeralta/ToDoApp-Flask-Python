document.addEventListener('DOMContentLoaded', function () {
    // Obtener elementos del DOM
    const taskCompletedCheckbox = document.getElementById('completed');
    const subtaskCheckboxes = document.querySelectorAll('.subtask-completed');

    // Agregar evento al checkbox de la tarea principal
    taskCompletedCheckbox.addEventListener('change', function () {
        // Cambiar el estado de las casillas de las subtareas
        subtaskCheckboxes.forEach(function (checkbox) {
            checkbox.checked = taskCompletedCheckbox.checked;
        });
    });

    // Agregar evento a las casillas de las subtareas
    subtaskCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            // Verificar si todas las subtareas están marcadas
            const allSubtasksCompleted = Array.from(subtaskCheckboxes).every(subtaskCheckbox => subtaskCheckbox.checked);
            
            // Marcar/desmarcar automáticamente la tarea principal
            taskCompletedCheckbox.checked = allSubtasksCompleted;
        });
    });
});