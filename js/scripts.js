/*
Variables to access the DOM and get:
 1.- <form> element to add a new tasks
 2.- The <ul> element to output the new tasks
 3.- The <input> element to get the user's text input
 4.- The <input> element checkbox to hide/display completed tasks
 5.- The <button> element to delete all tasks
 6.- The <div> element that works as a menu icon
 7.- The <nav> element that works as a navigational menu
 8.- The <div> element that works as a delete icon
 9.- The <h1> element that works as the title of the app
 10.- The <div> element that works as the instructions placeholder 
*/
const formTask = document.getElementById('add-wrapper');
const tWrapper = document.getElementById('tsk-wrapper');
const inputText = document.getElementById('inputTask');
const hideCheckBox = document.getElementById('hideCompleted');
const delAllBtn = document.getElementById('deleteAll');
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav');
const deleteIcon = document.getElementById('delete-icon');
const msg = document.getElementById('outputMsg');
const headerOne = document.querySelector('h1');
const instructions = document.getElementById('instructions');

//JavaScript code to: Declare global variables that will hold Objects retrieved from JSON files using AJAX technique
let taskItems, ajaxDemo, todoInstructions

/*
Conditional statement to:
    1.- Declare a variable taskItems
    2.- Check if object tasks already exists in Local Storage
        a.- If it does exists then get its value from Local Storage
            and Use JSON to parse the value and assign it to the variable taskItems
        b.- If it does not exists then initialize the variable taskItems with the Array Liteal Notation
            using square brackets [], and will request the instructions.json file using the fetch API and
            assign the value of the body data into the global todoInstructions variable using the object instantiation
            method. Then will call for the instructionsConstructor function that will construct the HTML elements 
            to display the content of the json file.
*/
if (localStorage.getItem('tasks')) {
    taskItems = JSON.parse(localStorage.getItem('tasks'));
} else {
    taskItems = [];
    fetch('js/instructions.json')
    .then((response) => {
    return response.json();
    })
    .then((data) => {
    todoInstructions = Object.create(data);
    for(const key in todoInstructions){
        instructionsConstructor(todoInstructions[key]);
    }
    })
    .catch( error => console.log('There was an error', error));
}

/*
JavaScript code to:
    1.- Request the mytodo.json file from the server using the fetch API ajax technique.
    2.- Then assign the data body object into the global ajaxDemo variable using the Object.create method
    3.- Use thr appname property value to assign it to the headerOne variable.
*/
fetch('js/mytodo.json')
.then((response) => {
    return response.json();
})
.then((data) => {
     ajaxDemo = Object.create(data);
     headerOne.innerHTML = ajaxDemo.appname;
})
.catch( error => console.log('There was an error', error));

/*
Event listeners to:
    1.- Submit a new task
    2.- Hide/display completed tasks
    3.- Complete a task
    4.- Delete all tasks
    5.- Delete all tasks using the deleteIcon variable
    6.- Display the navigational menu
*/
formTask.addEventListener('submit', addTask);
hideCheckBox.addEventListener('change', hideCompletedTasks);
tWrapper.addEventListener('click', completeTask);
delAllBtn.addEventListener('click', deleteAllTasks);
deleteIcon.addEventListener('click', deleteAllTasks);
menuIcon.addEventListener('click', showMenu);

/*
Local Storage code to:
    1.- Set a new item named "tasks" with the value of the variable taskItems (array) using the 
        JSON stringify method.
    2.- Use a forEach method and the item parameter to iterate over each one of the values of the array taskItems
        a.- Call the taskConstructor function using the item argument to construct <li> elements for each of the values of the array taskItems.
            This method only works when the page first loads and if the array is not empty previous tasks will be displayed, otherwise
            nothing will be displayed.
*/
localStorage.setItem('tasks', JSON.stringify(taskItems));
taskItems.forEach(item => {
    taskConstructor(item);
});

/*
JavaScript function to:
    1.- Use the event parameter
    2.- Remove the instructions if they are present on the DOM
    3.- Prevent the default behaviour of the html element, for example: prevent to submit a form
    4.- Use the array push method to add a new element at the end of the array taskItems
    5.- Update the local storage item "tasks" with the new value of the array taskItems
    6.- Use the "taskConstructor" with the text from the input to create a new <li> element and attach it to the <ul> element
    7.- Reset the form, which will cleare the text input field
    8.- Update the text value from the msg variable with the ajaxDemo addtask property value
*/
function addTask(event) {
event.preventDefault();
removeChilds(instructions);
taskItems.push(inputText.value);
localStorage.setItem('tasks', JSON.stringify(taskItems));
taskConstructor(inputText.value);
formTask.reset();
msg.innerHTML = ajaxDemo.addtask;
}

/*
JavaScript function to:
    1.- Catch the parameter text to use further in the function
    2.- Create a new <li> element and assign it to a variable named "nwTask"
    3.- Create a new <div> element and assign it to a variable named "ncBox"
    4.- Create a new <div> element and assign it to a variable named "liText"
    5.- Add the class "checkbox" to the variable "ncBox"
    6.- Append (add) the "ncBox" value (div element) to the "nwTask" variable (li element)
    7.- Assign the parameter "text" as a text content to the variable "liText"
    8.- Append (add) the "liText" value (text content) to the "nwTask" variable (li element)
    9.- Append (add) the "nwTask" value (li element) to the "tWrapper" variable (ul element)
*/
function taskConstructor(text) {
const nwTask =  document.createElement('li');
const ncBox = document.createElement('div');
const liText = document.createElement('p');
ncBox.classList.add('checkbox');
nwTask.appendChild(ncBox);
liText.textContent = text;
nwTask.appendChild(liText);
tWrapper.appendChild(nwTask);
}

/*
JavaScript function to:
    1.- Create a p node element and assign it into a variable named insText
    2.- Use the text parameter to update the text value from the variable insText
    3.- Append the newly created element p into the instructions (<div>) element
*/
function instructionsConstructor(text) {
const insText =  document.createElement('p')
insText.textContent = text;
instructions.appendChild(insText);
}

/*
JavaScript function to:
    1.- Use the event parameter
    2.- Prevent the default behaviour of the html element, for example: prevent to submit a form
    3.- Use the clear() method to delete all from the local storage
    4.- Invoke the removeChilds(element) function using the variable tWrapper (ul element) as an argument
    5.- Update the msg variable with the ajaxDemo deletemsg property value
    6.- Request the instructions.json file from the server using the fetch API ajax technique.
    7.- Then assign the data body object into the global todoInstructions object using the Object.create method
    8.- Using a for in loop to create a instructions paragraphs with the property values from the todoInstructions object
    9.- Catch any possible errors in the console log
*/
function deleteAllTasks(event) {
    event.preventDefault();
    localStorage.clear();
    removeChilds(tWrapper);
    msg.innerHTML = ajaxDemo.deletemsg;
    fetch('js/instructions.json')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        todoInstructions = Object.create(data);
        for(const key in todoInstructions){
            instructionsConstructor(todoInstructions[key]);
        }
    })
    .catch( error => console.log('There was an error', error));
}

/*
JavaScript function to:
    1.- Use the element parameter to use further in the program
    2.- Use a while element to:
        a.- Use the hasChildNodes() method to verify if the element argument has child nodes, the method will return true or false
        b.- While the element argument has child nodes (returns true) use the removeChild method to remove the firstChild of the element argument
*/
function removeChilds(element){
    while (element.hasChildNodes()) {
        element.removeChild(element.firstChild);
    }
}

/*
JavaScript function to:
    1.- Use the "checked" property to return if the "hideCheckBox" variable is checked or not and assign its boolean value in the variable cbChecked
    2.- Use the event.target to get the element that fired the event, depending of what element fired the event the blocks will use the parentElement property, or the
        firstChild property, of the previousElementSibling property to target the elements that will toogle classes.
    3.- If the checkbox hideCheckBox (hide all task option) is checked then the code will still run and the tasks will not be displayed because that option
        hide all completed tasks
    4.- If the checkbox hideCheckBox (hide all task option) is checked then the code will run but the tasks will remain visible to the user but with different
        styles since the classes were toggled.
*/
function completeTask(event) {
    let cbChecked = hideCheckBox.checked;
    if (event.target.tagName === 'LI' && cbChecked === false){
        event.target.classList.toggle('checked');
        event.target.classList.toggle('swipe');
        event.target.firstChild.classList.toggle('checked');
        msg.innerHTML = ajaxDemo.taskcompleted;
    } else if (event.target.tagName === 'LI' && cbChecked === true){
        event.target.classList.toggle('checked');
        event.target.classList.toggle('swipe');
        event.target.firstChild.classList.toggle('checked');
        event.target.classList.add('hidden');
        msg.innerHTML = ajaxDemo.taskcompleted;
    } else if (event.target.tagName === 'DIV' && cbChecked === false){
        event.target.parentElement.classList.toggle('checked');
        event.target.parentElement.classList.toggle('swipe');
        event.target.classList.toggle('checked');
        msg.innerHTML = ajaxDemo.taskcompleted;
    } else if (event.target.tagName === 'DIV' && cbChecked === true){
        event.target.parentElement.classList.toggle('checked');
        event.target.parentElement.classList.toggle('swipe');
        event.target.classList.toggle('checked');
        event.target.parentElement.classList.add('hidden');
        msg.innerHTML = ajaxDemo.taskcompleted;
    } else if (event.target.tagName === 'P' && cbChecked === false){
        event.target.parentElement.classList.toggle('checked');
        event.target.parentElement.classList.toggle('swipe');
        event.target.previousElementSibling.classList.toggle('checked');
        msg.innerHTML = ajaxDemo.taskcompleted;
    } else if (event.target.tagName === 'P' && cbChecked === true){
        event.target.parentElement.classList.toggle('checked');
        event.target.parentElement.classList.toggle('swipe');
        event.target.previousElementSibling.classList.toggle('checked');
        event.target.parentElement.classList.add('hidden');
        msg.innerHTML = ajaxDemo.taskcompleted;
    }
    
}

/*
JavaScript function to:
    1.- Use the classList.toggle method to toggle the class open into the navMenu element
    2.- Get all the elements  with the classname dot-icon from the DOM and assign it to the variable dotIcon
    3.- use a for loop to toggle the class close on every element in the node list dotIcon element 
*/
function showMenu(event) {
        navMenu.classList.toggle('open');
        const dotIcon = document.querySelectorAll('.dot-icon');
    for ( let i=0; i < dotIcon.length; i++) { 
        dotIcon[i].classList.toggle('close');
    }
}

/*
JavaScript function to:
    1.- Prevent default event behaviour
    2.- Get all elements with the class name "checked" and assign it to the variable liChecked
    3.- Use a for loop to iterate over the node list "liChecked" and add the class "hidden"
*/
function hideCompletedTasks(event) {
    event.preventDefault();
    const liChecked = document.querySelectorAll('.checked');
    for ( let i=0; i < liChecked.length; i++) { 
        liChecked[i].classList.toggle('hidden');
}
}