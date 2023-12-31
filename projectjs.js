document.addEventListener('DOMContentLoaded', function() {
  let taskInput = document.getElementById('taskInput');
  let addTaskButton = document.getElementById('addTaskButton');
  let addClearButton = document.getElementById('clearBtn');
  let taskList = document.getElementById('taskList');
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let doneColor = localStorage.getItem('kolor') || 'green';

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach(function(task, index) {
      let li = document.createElement('li');
      li.textContent = task;
      li.id = 'thisLiId'
      li.className = 'thisLiClass';
      task.className = 'theTask';
      let editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.className = 'editButton';
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'deleteButton';

      deleteButton.addEventListener('click', function() {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });

      editButton.addEventListener('click', function() {
        let updatedTask = prompt('Edit task:', task);
        if (updatedTask !== null) {
          tasks[index] = updatedTask;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      });

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  addTaskButton.addEventListener('click', function() {
    let task = taskInput.value.trim();
    if (task !== '') {
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      taskInput.value = '';
    }
  });
  addClearButton.addEventListener('click', function() {
    localStorage.clear();
    renderTasks();
  });


  renderTasks();
});
