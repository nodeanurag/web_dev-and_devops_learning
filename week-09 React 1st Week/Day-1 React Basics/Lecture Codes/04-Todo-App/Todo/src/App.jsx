
import { useState } from "react";

function App() {
    
    const [todos, setTodos] = useState([
        { 
            title: "Go to gym", 
            description: "Hit the gym regularly", 
        },
    ]);


    function addTodo() {
        
        setTodos([
            ...todos, 
            {
                title: document.getElementById("title").value, 
                description: document.getElementById("description").value, 
            },
        ]);
    }

    
    return (
        <div>
            <h1>Todo App</h1> {/* Render the list of todos */}

            {/* Input field for the todo title */}
            <input id="title" type="text" placeholder="Add Todo Title" /> 

            {/* Input field for the todo description */}
            <input id="description" type="text" placeholder="Add Todo Description" /> 

            {/* Button to trigger the addTodo function */}
            <button onClick={addTodo}>Add Todo</button> 

            <br />

            {/* Map through the todos array and render each todo item using the Todo component */}
            {
              todos.map((todo, index) => (
                <Todo 
                  key={index} // Unique key for each todo component
                  title={todo.title} // Pass the title prop to the Todo component
                  description={todo.description} // Pass the description prop to the Todo component
                />
            ))}
        </div>
    );
}

// Functional component to display each todo item
function Todo(props) {
    return (
        <div>
            <h3>{props.title}</h3> {/* Display the title of the todo */}
            <p>{props.description}</p> {/* Display the description of the todo */}
        </div>
    );
}

// Export the App component as default
export default App;