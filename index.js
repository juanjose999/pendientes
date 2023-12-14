let inputTask = document.getElementById('nameTask');
let tareasContainer = document.getElementById('tareasContainer');

// Cargar tareas almacenadas en el almacenamiento local al cargar la página
window.onload = function () {
    loadTasks();
};

function sendTask() {
    let msj = inputTask.value;
    if (msj.trim() !== '') {
        // Crear div y checkbox elements
        let newTaskDiv = document.createElement('div');

        // Crear un contenedor para el checkbox personalizado
        let customCheckboxContainer = document.createElement('span');
        customCheckboxContainer.className = 'custom-checkbox-container';
        newTaskDiv.appendChild(customCheckboxContainer);

        let newTaskCheck = document.createElement('input');
        newTaskCheck.type = 'checkbox';
        newTaskCheck.className = 'custom-checkbox';

        // Agregar el checkbox al contenedor
        customCheckboxContainer.appendChild(newTaskCheck);

        // Establecer el texto del div
        newTaskDiv.appendChild(document.createTextNode(msj));

        // Añadir botón para eliminar la tarea
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', function () {
            // Eliminar el div al hacer clic en el botón de eliminar
            tareasContainer.removeChild(newTaskDiv);
            // Guardar las tareas en el almacenamiento local
            saveTasks();
        });
        newTaskDiv.appendChild(deleteButton);

        // Añadir el div al contenedor
        tareasContainer.appendChild(newTaskDiv);

        // Añadir evento de clic al checkbox
        newTaskCheck.addEventListener('change', function () {
            let checkboxContainer = this.parentElement; // Obtener el contenedor del checkbox

            if (this.checked) {
                // Si está marcado, aplicar estilos de completado al texto y al checkbox
                newTaskDiv.classList.add('completado');
                checkboxContainer.classList.add('active');
            } else {
                // Si no está marcado, quitar estilos de completado al texto y al checkbox
                newTaskDiv.classList.remove('completado');
                checkboxContainer.classList.remove('active');
            }

            // Guardar las tareas en el almacenamiento local
            saveTasks();
        });

        // Limpiar el campo de entrada después de agregar la tarea
        inputTask.value = '';

        // Guardar las tareas en el almacenamiento local
        saveTasks();
    }
}

// Nueva función para verificar si un checkbox está activo
function checkIsActive(checkbox) {
    return checkbox.checked;
}

// Guardar tareas en el almacenamiento local
function saveTasks() {
    let tasks = Array.from(tareasContainer.children).map(taskDiv => ({
        text: taskDiv.textContent,
        completed: taskDiv.classList.contains('completado')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Cargar tareas desde el almacenamiento local
function loadTasks() {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        let tasks = JSON.parse(savedTasks);
        tasks.forEach(task => {
            let newTaskDiv = document.createElement('div');

            // Crear un contenedor para el checkbox personalizado
            let customCheckboxContainer = document.createElement('span');
            customCheckboxContainer.className = 'custom-checkbox-container';
            newTaskDiv.appendChild(customCheckboxContainer);

            let newTaskCheck = document.createElement('input');
            newTaskCheck.type = 'checkbox';
            newTaskCheck.className = 'custom-checkbox';

            // Agregar el checkbox al contenedor
            customCheckboxContainer.appendChild(newTaskCheck);

            // Establecer el texto del div
            newTaskDiv.appendChild(document.createTextNode(task.text));

            // Añadir botón para eliminar la tarea
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.addEventListener('click', function () {
                // Eliminar el div al hacer clic en el botón de eliminar
                tareasContainer.removeChild(newTaskDiv);
                // Guardar las tareas en el almacenamiento local
                saveTasks();
            });
            newTaskDiv.appendChild(deleteButton);

            // Aplicar estilos de completado si es necesario
            if (task.completed) {
                newTaskDiv.classList.add('completado');
                newTaskCheck.checked = true;
                customCheckboxContainer.classList.add('active');
            }

            // Añadir evento de clic al checkbox
            newTaskCheck.addEventListener('change', function () {
                let checkboxContainer = this.parentElement; // Obtener el contenedor del checkbox

                if (this.checked) {
                    // Si está marcado, aplicar estilos de completado al texto y al checkbox
                    newTaskDiv.classList.add('completado');
                    checkboxContainer.classList.add('active');
                } else {
                    // Si no está marcado, quitar estilos de completado al texto y al checkbox
                    newTaskDiv.classList.remove('completado');
                    checkboxContainer.classList.remove('active');
                }

                // Guardar las tareas en el almacenamiento local
                saveTasks();
            });

            // Agregar el div al contenedor
            tareasContainer.appendChild(newTaskDiv);
        });
    }
}
