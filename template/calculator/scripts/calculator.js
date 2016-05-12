/**
 * core
 */
var input = "";
var output = "";
var operation = "";
var operationsIndex = ["+", "-", "*", "/"];

// Decide what kind of button was pressed.
function handleInput(params) {    
    switch (params.target.className) {
        case "number": 
            handleNumber(params.target.value);
            break;
        case "operator":
            handleOperation(params.target.value);
            break;
        case "command":
            handleCommand(params.target.innerHTML);
            break;
        default:
            break;
    }
};
// Add the handleInput to the window.
window.addEventListener('click', handleInput);

function handleNumber (value) {
    // If there was no number inserted yet, set the value as the input.
    if (input === "") {
        input = value;
    }
    // Otherwise concatenate the new value to the existing input.
    else {
        input = input.concat(value);
    }
    updateDisplay();
};

function handleOperation (newOperation) {
    // Check if a new calculation has been started.
    if (operation === "" && !(input === "") && !(output === "")) {
        output = input;
        input = "";
    }
    // Set the operation.
    operation = newOperation;
    
    // Copy the input to the output.
    if (output === "") {
        output = input.replace(/^0+(?!$)/, "");
        input = "";
    }
    updateDisplay();
}

function handleCommand (command) {
    // Clear everything when the C button is pressed.
    if (command === "C") {        
        input = "";
        output = "";
        operation = "";
    }
    // Handle the evaluate button.
    else {
        // If there is no ouput and operation but input, set the ouput to be the input.
        if (output === "" && operation === "" && !(input === "")) {
            output = input.replace(/^0+(?!$)/, "");
            input = "";
        }
        // If there is something in the input, the output and an operation, calculate the result.
        else if (!(input === "") && !(output === "") && !(operation === "")) {
            // Map the operations to the array with functions.
            var index = operationsIndex.indexOf(operation);
            // Parse the strings to numbers.
            var a = parseFloat(output);
            var b = parseFloat(input);
            // Call the function array with the prepared parameters.
            output = operations[index](a, b).toString();
            // Reset input and operation.
            input = "";
            operation = "";
        }
        // Do nothing when there is no input or operation.
        else if (input === "" && operation == "" && !(output === "") ||
                 input === "" && operation == "" && output === "") {
        }
        // Everything else is an illegal calculation (missing argument, input or output).
        else {
            input = "";
            output = "Illegal Calculation";
            operation = "";
        }
    }
    updateDisplay();
};

// Simple array of functions which will calculate the result.
var operations = [
    function add (a, b) {
        return a + b;
    },
    function sub (a, b) {
        return a - b;
    },
    function mul (a, b) {
        return a * b;
    },
    function div (a, b) {
        return a / b;
    }
]

/**
 * UI
 */
// Will hold our HTML elements.
var displayOutput;
var displayIntput;

// Set the HTML elements which will be updated and set the Welcome output.
window.addEventListener('load', function() {
    displayOutput = document.getElementById("output");
    displayIntput = document.getElementById("input");
    
    displayOutput.innerHTML = "Welcome";
});

// Update the display (after each button press).
function updateDisplay () {
    displayIntput.innerHTML = input;
    displayOutput.innerHTML = output.concat(" ").concat(operation);
}