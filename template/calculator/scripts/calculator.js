/************************************************
 ******************************************* CORE
 ************************************************/
var input = "";
var output = "";
var operation = "";

// Simple object of functions which will calculate the result.
var operations = {
    "+":
    function (a, b) {
        return a + b;
    },
    "-":
    function (a, b) {
        return a - b;
    },
    "*":
    function (a, b) {
        return a * b;
    },
    "/":
    function (a, b) {
        return a / b;
    }
}

function evaluate() {
    var a = parseFloat(output);
    var b = parseFloat(input);
    // Call the functions object with the prepared parameters.
    output = operations[operation](a, b).toString();
    // Reset input and operation.
    input = "";
    operation = "";
}

/************************************************
 ********************************************* UI
 ************************************************/
 
/////////////////////
//////////////// INIT
/////////////////////

// Will hold our HTML elements.
var displayOutput;
var displayIntput;
// Set to true when an invalid calculation occurs in order to stop updateDisplay().
var invalidOp = false;

// Add the handleInput to the window.
window.addEventListener('click', handleInput);

// Set the HTML elements which will be updated and set the Welcome output.
window.addEventListener('load', function() {
    displayOutput = document.getElementById("output");
    displayIntput = document.getElementById("input");
    
    displayOutput.innerHTML = "Welcome";
});


/////////////////////
//// HELPER FUNCTIONS
/////////////////////

// Print 'Invalid Calculation'.
function invalidCalculation() {
    clear();
    invalidOp = true;
    updateDisplay("Invalid Calculation", input, operation);
}

// Update the values in the display.
function updateDisplay (first, second, operator) {
    if(!(first === "Invalid Calculation")) {
        var firstNumber = isNaN(parseFloat(first)) ? "" : parseFloat(first);
        displayOutput.innerHTML = firstNumber.toString().concat(" ").concat(operator);
    }
    else {
        displayOutput.innerHTML = first;
    }
    displayIntput.innerHTML = isNaN(parseFloat(second)) ? "" : parseFloat(second);
}

// Delete the current values of input, output and operation.
function clear() {
    input = "";
    output = "";
    operation = "";
}

// Move the value of input to output, reset the input to an empty value.
function moveInputToOutput() {
    output = input;
    input = "";
}


/////////////////////
///// CHECK FUNCTIONS
/////////////////////

// Check if all values are set.
function hasAll() {
    return (!(input === "") && !isNaN(input) && !(output === "") && !isNaN(output) && !(operation === ""));
}

// Check if the input and output is set, but operation is not.
function hasInputAndOutput() {
    return (operation === "" && !(input === "") && !(output === ""));
}

// Check if the input hasn't been set yet.
function hasNoInputOrOperation() {
    return (input === "" && !isNaN(input) && operation == "" && (!(output === "") || (output === "" && !isNaN(output))));
}

// Check if only the input is set.
function hasInput() {
    return (output === "" && operation === "" && !(input === "" && isNaN(input)));
}


/////////////////////
/////////////// LOGIC
/////////////////////

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
    if (!invalidOp) {
        updateDisplay(output, input, operation);
    }
    invalidOp = false;
}

function handleNumber (value) {
    // If there was no number inserted yet, set the value as the input.
    if (input === "") {
        input = value;
    }
    // Otherwise concatenate the new value to the existing input.
    else {
        input = input.concat(value);
    }
}

function handleOperation (newOperation) {
    // Check if a new calculation has been started.
    if (hasInputAndOutput()) {
        moveInputToOutput();
    }
    // Set the operation.
    operation = newOperation;
    if (output === "") {
        moveInputToOutput();
    }
}

function handleCommand (command) {
    // Clear everything when the C button is pressed.
    if (command === "C") {    
        clear();
        updateDisplay(output, input, operation);
    }
    // Handle the evaluate button.
    else {
        // If there is no ouput and operation but input, set the ouput to be the input.
        if (hasInput()) {
            copyInputToOutput();
        }
        // If there is something in the input, the output and an operation, calculate the result.
        else if (hasAll()) {
            // If one tries to divide by zero, an invalid value or the operator hasn't beend selected, return with error.
            if ((operation === "/" && parseInt(input) === 0) || operation === "" || isNaN(output) || isNaN(input)) {
                invalidCalculation();
                return;
            }
            evaluate();
        }
        else if(hasNoInputOrOperation()) {
            // Do nothing if there is no new input or operation.
        }
        // Everything else is an illegal calculation (missing argument, input or output).
        else {
            invalidCalculation();
        }
    }
}
