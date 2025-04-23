document.addEventListener('DOMContentLoaded', loadTasks);

function addTask()  {
    let input = document.getElementById('taskInput');
    let inputTanggal = document.getElementById('dateInput');
    let taskText = input.value;
    let date = inputTanggal.value;
    let currentDate = new Date(date).toDateString();
    let id  = document.getElementById('idInput').value;

    if (!taskText && !date) {
        return;
    }

    let tr = document.createElement('tr');
    tr.innerHTML  = `<tr>
                        <td>${taskText}</td>
                        <td>${(date != null ?  currentDate : '-')}</td>
                        <td><span class="badge text-bg-secondary">On Progres</span></td>
                        <td>
                            <div class="container d-flex flex-row">
                                <div class="pe-2" onclick="removeTask(${id})">
                                    <i class="bi bi-trash text-danger"></i>
                                </div>
                                <div class="" onclick="showModalUpdate(${id})">
                                    <i class="bi bi-pencil text-secondary"></i>
                                </div>
                            </div>
                        </td>
                    </tr>`;
    document.getElementById('bodyTable').appendChild(tr);

    saveTask(taskText, date, id);
    input.value = '';
}

function removeTask(id) {
    let tasks = getTaskFromStorage();
    tasks = tasks.filter((task) => String(task.id) !== String(id));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    location.reload();
}

function toggleComplete(task) {
    task.classList.toggle('completed');
}

function saveTask(taskText, taskDate, id) {
    let tasks = getTaskFromStorage();

    tasks.push({id: id, text: taskText, completed: false, date: taskDate, status: 0});
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskFromStorage() {
    let tasks  = localStorage.getItem('tasks');
    try {
        tasks = JSON.parse(tasks) || [];
    } catch (error) {
        tasks = [];
    }

    return tasks;
}

function loadTasks() {
    let tasks = getTaskFromStorage();
    
    let lastId = tasks.length +  1;

    document.getElementById('idInput').value =  lastId;
    tasks.forEach((tasks) => {
    let tr = document.createElement('tr');
    tr.innerHTML  = `<tr>
                        <td><span class="${tasks.status == 1 ? 'completed' : ''}">${tasks.text}</span></td>
                        <td><span class="${tasks.status == 1 ? 'completed' : ''}">${(tasks.date != null ? new Date(tasks.date).toDateString() : '-')}</span></td>
                        <td>${(tasks.status == 0 ? '<span class="badge text-bg-secondary">On Progres</span>' : (tasks.status == 1 ? '<span class="badge text-bg-success">DONE</span>' : '-'))}</td>
                        <td>
                            <div class="container d-flex flex-row">
                                <div class="pe-2" onclick="removeTask(${tasks.id})">
                                    <i class="bi bi-trash text-danger"></i>
                                </div>
                                <div class="" onclick="showModalUpdate(${tasks.id})">
                                    <i class="bi bi-pencil text-secondary"></i>
                                </div>
                            </div>
                        </td>
                    </tr>`;
    document.getElementById('bodyTable').appendChild(tr);

    });
}

function updateTask() {
    let tasks = getTaskFromStorage();

    let id = document.getElementById('idInput').value;
    let textUpdate = document.getElementById('taskInputUpdate').value;
    let dateUpdate = document.getElementById('dateInputUpdate').value;
    let checkStatus = document.getElementById('checkStatus');

    tasks.forEach(task => {
        if (String(task.id) === String(id)) {
            if (task.text === textUpdate && task.date === dateUpdate) {
                task.completed = !task.completed;
            } else {
                task.text = textUpdate;
                task.date = dateUpdate;
            }

            task.status = checkStatus.checked ? 1 : 0;
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

    closeModaUpdate();
    location.reload();
}


function showModalUpdate(id) {
    let dataTask = getTaskFromStorage();
    let modal =  document.getElementById('modalUpdate');

    dataTask.forEach((task) => {
        if  (task.id ==  id)  {
            document.getElementById('idInput').value = task.id;
            document.getElementById('taskInputUpdate').value =  task.text;
            document.getElementById('dateInputUpdate').value = task.date;
            document.getElementById('checkStatus').checked  = (task.status == 1 ? true : false);
        } 
    });

    modal.classList.add('d-block');
    modal.classList.remove('d-none');
    
}

function closeModaUpdate() {
    let modal  = document.getElementById('modalUpdate');
    modal.classList.add('d-none');
    modal.classList.remove('d-block');

}
