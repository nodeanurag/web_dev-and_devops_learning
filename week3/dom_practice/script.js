// Select the DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Event listener for the Add button
addBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    
    // Only add if the input isn't empty
    if (taskText !== '') {
        createTask(taskText);
        taskInput.value = ''; // Clear the input field
    }
});

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

// Function to handle creating the HTML elements for a new task
function createTask(text) {
    // Create the main list item (li)
    const li = document.createElement('li');

    // Create a span to hold the task text
    const span = document.createElement('span');
    span.textContent = text;
    span.className = 'task-text';
    li.appendChild(span);

    // Create a container for the buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    // Create the Edit button (Update)
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    
    // Update logic: Use a prompt to get new text
    editBtn.addEventListener('click', () => {
        const newText = prompt('Update your task:', span.textContent);
        // Only update if the user didn't cancel and the new text isn't empty
        if (newText !== null && newText.trim() !== '') {
            span.textContent = newText.trim();
        }
    });

    // Create the Delete button (Delete)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    
    // Delete logic: Remove the 'li' element from the DOM
    deleteBtn.addEventListener('click', () => {
        li.remove();
    });

    // Append buttons to the actions container, then to the list item
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);
    li.appendChild(actionsDiv);

    // Finally, append the list item to the main list
    taskList.appendChild(li);
}