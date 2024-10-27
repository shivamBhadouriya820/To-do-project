// This script manages the functionality of a To-Do list application.
// It allows users to add, edit, delete tasks, set due dates, prioritize tasks, and store them in local storage.

// Wait until the entire document (HTML) content is fully loaded before executing the script.
document.addEventListener("DOMContentLoaded", () => {
    // Get references to key elements in the HTML by their IDs:
    const taskInput = document.getElementById("taskInput"); // Input field for new tasks
    const addTaskButton = document.getElementById("addTaskButton"); // Button to add a new task
    const taskList = document.getElementById("taskList"); // UL where tasks are displayed
    const filterSelect = document.getElementById("filterSelect"); // Select dropdown for filtering tasks
    const themeToggle = document.getElementById("themeToggle"); // Toggle for dark/light mode

    // Load tasks from local storage on page load
    loadTasks();

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    // Function to save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("li").forEach(taskItem => {
            const taskText = taskItem.querySelector(".task-description").textContent;
            const completed = taskItem.classList.contains("completed"); // Check if task is completed
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to local storage
    }

    // Function to add a new task to the DOM and local storage
    function addTask() {
        const taskText = taskInput.value.trim(); // Get the task input value

        if (taskText !== "") {
            addTaskToDOM(taskText); // Add task to the DOM
            saveTasks(); // Save tasks to local storage
            taskInput.value = ""; // Clear input field
        } else {
            alert("Please enter a task."); // Alert for empty input
        }
    }

    // Function to add a task item to the DOM
    function addTaskToDOM(taskText, completed = false) {
        const taskItem = document.createElement("li"); // Create a new list item
        taskItem.classList.add("task-item", "flex", "justify-between", "items-center", "p-2", "border", "border-gray-300", "rounded"); // Style classes

        if (completed) {
            taskItem.classList.add("completed"); // Add completed class if the task is completed
        }

        const taskDescription = document.createElement("span"); // Span to hold task text
        taskDescription.classList.add("task-description"); // Add class for styling
        taskDescription.textContent = taskText; // Set task text

        taskItem.appendChild(taskDescription); // Append description to task item

        // Create an edit button
        const editButton = document.createElement("button");
        editButton.textContent = "✎"; // Edit icon
        editButton.classList.add("edit-button", "ml-2", "text-blue-500"); // Add classes for styling

        // Edit functionality
        editButton.onclick = () => {
            const newTaskText = prompt("Edit task:", taskDescription.textContent);
            if (newTaskText) {
                taskDescription.textContent = newTaskText; // Update task text
                saveTasks(); // Save updated tasks to local storage
            }
        };

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "✖"; // Delete icon
        deleteButton.classList.add("delete-button", "ml-2", "text-red-500"); // Add classes for styling

        // Delete functionality
        deleteButton.onclick = () => {
            taskItem.remove(); // Remove task item from the DOM
            saveTasks(); // Save updated tasks to local storage
        };

        // Create a complete button
        const completeButton = document.createElement("button");
        completeButton.textContent = "✔"; // Complete icon
        completeButton.classList.add("complete-button", "ml-2", "text-green-500"); // Add classes for styling

        // Mark task as completed
        completeButton.onclick = () => {
            taskItem.classList.toggle("completed"); // Toggle completed class
            saveTasks(); // Save updated tasks to local storage
        };

        // Append buttons to the task item
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);
        taskItem.appendChild(completeButton);
        
        // Append the task item to the task list
        taskList.appendChild(taskItem);
    }

    // Event listener for the Add Task button
    addTaskButton.addEventListener("click", addTask);

    // Event listener for the Enter key within the input field
    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(); // Add task on Enter key press
        }
    });

    // Function to filter tasks based on selection
    function filterTasks() {
        const selectedFilter = filterSelect.value; // Get selected filter value
        const taskItems = document.querySelectorAll(".task-item"); // Get all task items

        taskItems.forEach(taskItem => {
            const isCompleted = taskItem.classList.contains("completed"); // Check if task is completed
            
            if (selectedFilter === "all") {
                taskItem.style.display = ""; // Show all tasks
            } else if (selectedFilter === "completed" && !isCompleted) {
                taskItem.style.display = "none"; // Hide non-completed tasks
            } else if (selectedFilter === "active" && isCompleted) {
                taskItem.style.display = "none"; // Hide completed tasks
            }
        });
    }

    // Event listener for task filter
    filterSelect.addEventListener("change", filterTasks);

    // Function to toggle between light and dark modes
    function toggleTheme() {
        document.body.classList.toggle("dark"); // Toggle dark class on body
        saveTasks(); // Optionally save tasks when theme is toggled
    }

    // Event listener for theme toggle
    themeToggle.addEventListener("click", toggleTheme);
});
