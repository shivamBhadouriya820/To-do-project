// This script manages the functionality of a To-Do list app.
// It listens for user input to add tasks to the list and provides a way to remove them.

// Wait until the entire document (HTML) content is fully loaded before executing the script.
document.addEventListener("DOMContentLoaded", () => {
    
    // Get references to key elements in the HTML by their IDs:
    
    const taskInput = document.getElementById("taskInput");  // The input box where users enter their tasks
    const addTaskButton = document.getElementById("addTaskButton");  // The button to add a new task to the list
    const taskList = document.getElementById("taskList");  // The unordered list (UL) where tasks are displayed

    // Function to add a new task
    function addTask() {
        // Get and trim the input value to remove any extra spaces at the beginning or end
        const taskText = taskInput.value.trim();

        // Only proceed if the input is not empty
        if (taskText !== "") {
            
            // Create a new list item (LI) for the task and apply styling classes
            const taskItem = document.createElement("li");
            taskItem.classList.add(
                "bg-gray-100",      // Background color
                "px-4",             // Padding on the x-axis
                "py-2",             // Padding on the y-axis
                "border",           // Adds a border
                "border-gray-300",  // Border color
                "rounded",          // Rounded corners
                "flex",             // Flexbox container for spacing between elements
                "justify-between",  // Distribute items evenly with space between them
                "items-center"      // Align items to the center on the cross-axis
            );

            // Create a span element to hold the task description text
            const taskDescription = document.createElement("span");
            taskDescription.textContent = taskText; // Set the text of the task to the user's input

            // Append the task description (span) to the task item (li)
            taskItem.appendChild(taskDescription);

            // Create a delete button to remove the task
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "✖"; // Cross symbol representing delete
            deleteButton.classList.add(
                "text-red-500",    // Red color for delete button
                "hover:text-red-700", // Darker red on hover
                "ml-4"             // Left margin for spacing from task text
            );

            // Event listener to remove the task item from the list when delete button is clicked
            deleteButton.onclick = () => taskItem.remove(); // Arrow function to simplify syntax
            // Alternative: deleteButton.addEventListener("click", () => taskItem.remove());

            // Append the delete button to the task item (li)
            taskItem.appendChild(deleteButton);

            // Append the task item (li) to the task list (ul)
            taskList.appendChild(taskItem);

            // Clear the input field after adding the task
            taskInput.value = ""; // Reset the input field
        } else {
            // If the input is empty, display an alert to prompt the user
            alert("Please enter a task."); // Basic alert; can be replaced with a custom modal or tooltip
        }
    }

    // Event listener for the Add Task button
    addTaskButton.addEventListener("click", addTask);
    // Alternative: addTaskButton.onclick = addTask; // Directly assign the function if no extra parameters are needed

    // Event listener for the Enter key within the input field
    taskInput.addEventListener("keypress", (event) => {
        // Check if the key pressed is the Enter key (keyCode 13)
        if (event.key === "Enter") {
            addTask();
        }
    });
    // Alternative: Using event.keyCode (old way) to check for Enter: if (event.keyCode === 13)
});



Explanation of Each Element
document.addEventListener("DOMContentLoaded", ... ):

Ensures the script runs only after the entire HTML has loaded.
Alternative: Place the script at the end of the HTML, just before the closing </body> tag, so it loads after the HTML.
const taskInput = document.getElementById("taskInput"):

Finds the input field where the user enters the task text using getElementById.
Alternative: document.querySelector("#taskInput") can also be used, which is more flexible but slower.
const taskText = taskInput.value.trim();:

.value gets the current text in the input field.
.trim() removes any extra whitespace from the beginning and end of the text.
Alternative: Use .replace(/^\s+|\s+$/g, "") to trim whitespace manually.
taskItem.classList.add(...):

.classList.add() adds multiple classes to style the new task item.
Alternative: taskItem.className = "class1 class2 ..."; sets all classes at once but will overwrite any existing classes.
deleteButton.onclick = () => taskItem.remove();:

Attaches a function to remove the taskItem (LI) when deleteButton is clicked.
Alternative: deleteButton.addEventListener("click", () => taskItem.remove());
addTaskButton.addEventListener("click", addTask):

Adds an event listener to call addTask() when the add button is clicked.
Alternative: addTaskButton.onclick = addTask;
taskInput.addEventListener("keypress", ...):

Attaches an event listener for when a key is pressed in taskInput.
Checks if the pressed key is "Enter" to call addTask.
Alternative: Use event.keyCode === 13 instead of event.key for older compatibility.