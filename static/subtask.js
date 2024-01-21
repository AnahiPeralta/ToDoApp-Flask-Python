function addSubtaskInput() {
    const container = document.getElementById('subtasksContainer');
    const subtaskCount = container.querySelectorAll('.input-subtasks').length + 1;

    const div = document.createElement('div');
    div.classList.add('input-div', 'subtask');
    div.id = `subtask${subtaskCount}Container`;

    const label = document.createElement('label');
    label.setAttribute('for', `subtask${subtaskCount}`);

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('name', `subtasks`);
    input.setAttribute('class', 'input-subtasks');
    input.setAttribute('id', `subtask${subtaskCount}`);
    input.setAttribute('placeholder', `Escribe la Subtarea ${subtaskCount}`);

    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-subtask');
    
    // Cambiado para utilizar el ícono SVG en lugar de texto
    const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgIcon.setAttribute("width", "22");
    svgIcon.setAttribute("height", "22");
    svgIcon.setAttribute("fill", "currentColor");
    svgIcon.setAttribute("class", "bi bi-x");
    svgIcon.setAttribute("viewBox", "0 0 16 16");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708");

    svgIcon.appendChild(path);
    removeButton.appendChild(svgIcon);

    removeButton.onclick = function() {
        removeSubtask(div.id);
    };

    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(removeButton);
    container.appendChild(div);
}

function removeSubtask(containerId) {
    const container = document.getElementById(containerId);
    container.parentNode.removeChild(container);
}