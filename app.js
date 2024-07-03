const panelList = document.querySelector('.panel-list');
const panelInput = document.querySelector('.panel-input');
const panelAddButton = document.querySelector('.add-todo-button');
const buttonClear = document.querySelector('.panel-clear');
const noTodosMessage = document.getElementById('no-todos-message');

function createElement(tagName, className, innerText, parent) {
    let element = document.createElement(tagName);
    element.setAttribute('class', className);
    element.innerText = innerText;
    parent.appendChild(element);
    return element;
}

let todos = [
    {
        id: 1,
        title: "Learn HTML",
        is_Done: false,
    },
    {
        id: 2,
        title: "Learn CSS and SCSS",
        is_Done: false,
    },
    {
        id: 3,
        title: "Learn JavaScript",
        is_Done: false,
    },
    {
        id: 4,
        title: "Learn React.js",
        is_Done: false,
    },
];

let updatedTodo = null;
let updatedTodoIndex = null;

function generateTodos() {
    panelList.innerHTML = '';
    for (let todo of todos) {
        let todoLi = createElement('li', 'panel-item', '', panelList);
        let todoSpan = createElement('span', todo.is_Done ? 'panel-item__text panel-item__text_done' : 'panel-item__text', todo.title, todoLi);
        let todoEditButton = createElement('button', 'panel-item__edit', 'edit', todoLi);
        let todoDeleteButton = createElement('button', 'panel-item__delete', 'delete', todoLi);

        todoDeleteButton.addEventListener('click', function () {
            if (updatedTodo !== null && updatedTodoIndex !== null) {
                alert('Todo yangilanmoqda');
            } else {
                deleteTodo(todo.id);
            }
        });

        todoEditButton.addEventListener('click', function () {
            if (updatedTodo !== null && updatedTodoIndex !== null) {
                alert('Todo yangilanmoqda');
            } else {
                updateTodo(todo.id);
            }
        });

        todoSpan.addEventListener('click', function () {
            if (todoSpan.classList.contains('panel-item__text_done')) {
                todoSpan.classList.remove('panel-item__text_done');
            } else {
                todoSpan.classList.add('panel-item__text_done');
            }
        });
    }

    if (todos.length === 0) {
        buttonClear.style.display = 'none';
        noTodosMessage.style.display = 'block';
    } else {
        buttonClear.style.display = 'block';
        noTodosMessage.style.display = 'none';
    }
}

buttonClear.addEventListener('click', function () {
    todos = [];
    generateTodos();
    buttonClear.style.display = 'none';
});

generateTodos();

function createTodo(e) {
    e.preventDefault();
    if (panelInput.value.trim() === '') {
        alert('Maydon bo\'sh');
    } else {
        if (updatedTodo !== null && updatedTodoIndex !== null) {
            updatedTodo.title = panelInput.value;
            todos = [...todos.slice(0, updatedTodoIndex), updatedTodo, ...todos.slice(updatedTodoIndex)];
            updatedTodo = null;
            updatedTodoIndex = null;
            panelInput.value = null;
            panelAddButton.innerText = 'Add';
            generateTodos();
        } else {
            let newTodo = {
                id: todos.length <= 0 ? 1 : todos[todos.length - 1].id + 1,
                title: panelInput.value,
                is_Done: false
            };

            todos.push(newTodo);
            panelInput.value = '';
            generateTodos();
        }
    }
}

function deleteTodo(id) {
    todos = todos.filter((item => item.id !== id));
    generateTodos();
}

function updateTodo(id) {
    updatedTodo = todos.find(item => item.id === id);
    updatedTodoIndex = todos.findIndex(item => item.id === id);
    deleteTodo(id);
    panelInput.value = updatedTodo.title;
    panelAddButton.innerText = 'Edit';
}

panelAddButton.addEventListener('click', createTodo);
