const form = document.querySelector(".todo-form");
const output = document.querySelector(".output");
const btn = document.querySelector(".deleteBtn");
const BASE_URL = "https://jsonplaceholder.typicode.com/todos?_limit=7/";

const deleteTodo = (e) => {
   

    fetch(BASE_URL + e.target.id, {
        method: "DELETE",
    })
    .then(res => {
        console.log(res)
        if (res.ok) {
            e.target.remove();
        }
    })
};




const getTodo = () => {
    fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => {

        output.innerHTML = "";
        

        data.forEach((todo) => {
            const todoDiv = document.createElement("div");
            todoDiv.classList.add("row", "m-3");
            

            const col = document.createElement("div");
            col.classList.add("col-11");
            col.id = todo.id;

            const todoText = document.createElement("p");
            todoText.classList.add("text-center", "m-1", "todoClass");
            todoText.innerText = todo.title;

            col.appendChild(todoText);
            todoDiv.appendChild(col);

            // 2nd div
            const col2 = document.createElement("div");
            col2.classList.add("col");

            const btn = document.createElement("button");
            btn.innerText = "X";
            btn.classList.add("btn", "btn-danger", "m-2", "deleteBtn");
            
            

            todoDiv.appendChild(col2);
            col2.appendChild(btn);

            output.appendChild(todoDiv);


            if(todo.completed === true){
                todoText.classList.add("completed");
            }

        });
        
    });
};



getTodo();

let todoList = [{
    userId: 1,
    id: crypto.randomUUID(),
    title: "delectus aut autem",
    completed: false
}];

const toggleModal = () => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
    const modalClose = document.querySelector("#closebtn");
    modalClose.addEventListener("click", () => {
        modal.style.display = "none";

    });

}

const validateInput = () => {
    let input = document.forms["todo"]["text"].value;
    if (input == "") {
        errorMessage.classList.remove("error");
        
        return false;
    }
    errorMessage.classList.add("error");
    return true;
};



output.addEventListener("click", (e) => {


    if(e.target.nodeName === "P"){
        e.target.classList.toggle("completed");
    }
    if(e.target.nodeName === "DIV"){
        e.target.querySelector("p").classList.toggle("completed");

    }
    if(e.target.nodeName === "BUTTON"){
        if(e.target.parentElement.parentElement.querySelector("p").classList.contains("completed")){
            deleteTodo(e);
            e.target.parentElement.parentElement.remove();
            
            
        }
        if(!e.target.parentElement.parentElement.querySelector("p").classList.contains("completed")){
            toggleModal();
            
        }
    }
});




const createTodoElement = (inputValue, id) => {
   

    const todo = document.createElement("div");
    todo.classList.add("row", "m-3");

    const col = document.createElement("div");
    col.classList.add("col-11");
    col.id = id;

    const todoText = document.createElement("p");
    todoText.classList.add("text-center", "m-1");
    todoText.innerText = inputValue;

    col.appendChild(todoText);
    todo.appendChild(col);

    // 2nd div
    const col2 = document.createElement("div");
    col2.classList.add("col");

    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.classList.add("btn", "btn-danger", "m-2", "deleteBtn");
    btn.id = id;




    todo.appendChild(col2);
    col2.appendChild(btn);

    
    return todo;
}



form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  
  if (!validateInput()) {   
    return;
  }

  
  const input = form.querySelector("input[type=text]");
  const inputValue = input.value;

  const newTodo = {
    userId: 1,
    id: crypto.randomUUID(),
    title: inputValue,
    completed: false
  };

  fetch(BASE_URL, { 
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
})
.then((response) => response.json())
.then((json) => console.log(json)); 



  todoList.push(newTodo);
  

  const todo = createTodoElement(inputValue, newTodo.id);
  document.querySelector('#output').appendChild(todo);
    
  form.reset();

});


