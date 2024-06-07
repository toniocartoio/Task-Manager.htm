document.addEventListener('DOMContentLoaded', (event) => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task !== '') {
            addTask(task);
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('task-remove')) {
            const taskItem = e.target.parentElement;
            removeTask(taskItem);
        }
    });

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            renderTask(task);
        });
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(taskItem => {
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(task) {
        renderTask(task);
        saveTasks();
    }

    function renderTask(task) {
        const taskItem = document.createElement('li');
        taskItem.textContent = task;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Rimuovi';
        removeButton.classList.add('task-remove');
        taskItem.appendChild(removeButton);

        taskList.appendChild(taskItem);
    }

    function removeTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }
});
