function confirmDelete(taskId) {
    var confirmResult = window.confirm("¿Realmente deseas eliminar esta tarea?");

    if (confirmResult) {
        window.location.href = "/delete/" + taskId;
    } else {
        console.log("Eliminación cancelada por el usuario");
    }
}