
  


// 
let state = {
    todos: [],
    users: []
  };
  let box = document.querySelector('.box');
  let button = document.querySelector('.btn');
  
button.addEventListener('click', function() {
    let box = document.querySelector('.box');
  
    function getRequest() {
      let getTodos = function() {
        return fetch("http://localhost:5050/todos")
          .then((res) => res.json())
          .then((todos) => {
            state.todos = todos;
            return todos;
          });
      };
  
      let getUsers = function() {
        return fetch("http://localhost:5050/users")
          .then((res) => res.json())
          .then((users) => {
            state.users = users;
            return users;
          });
      };
  
      Promise.all([getTodos(), getUsers()]).then(() => {
        for (let i = 0; i < state.todos.length; i++) {
          let liHtml = `
            <li  class="let" data-id="${state.todos[i].id}" 
             style=" gap: 10px; padding: 10px;">
         
              <span>ID: ${state.todos[i].id}</span>
              <br>
              <span>Title: ${state.todos[i].title}</span>
              <br>
              <span>Completed: ${state.todos[i].completed}</span>
              <br>
              <br>
              <button class="btn btn-danger"style="height:"20px"  onclick="deleteTask(${state.todos[i].id})">Delete</button>
            </li>
          `;
          box.insertAdjacentHTML('beforeend', liHtml);
        }
      });
    }
  
    getRequest();
  

  });

  function deleteTask(taskId) {
    fetch(`http://localhost:5050/todos/${taskId}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (response.ok) {
          console.log('Görev başarıyla silindi.');
  
          // Remove task from HTML
          let taskElement = document.querySelector(`li[data-id="${taskId}"]`);
          if (taskElement) {
            taskElement.remove();
          }
          // Remove task from state.todos
          state.todos = state.todos.filter(task => task.id !== taskId);
        } else {
          console.log('Görev silinirken bir hata oluştu.');
        }
      })
      .catch((error) => {
        console.log('Hata:', error);
      });
  }

  const checkbox = document.querySelector('#flexSwitchCheckDefault');
  const iconSun = document.querySelector(' .fa-light');
  const iconMoon = document.querySelector('.fa-moon');
  
  if (iconSun.style.display === 'inline-block') {
    document.body.style.backgroundColor = 'white';
  }
  
  checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
      // Dark mode
      document.body.style.backgroundColor = 'black';
      iconSun.style.display = 'none';
      iconMoon.style.display = 'inline-block';
 
     
    } else {
      // Light mode
      document.body.style.backgroundColor = 'white';
      iconSun.style.display = 'inline-block';
      iconMoon.style.display = 'none';
    }
  });