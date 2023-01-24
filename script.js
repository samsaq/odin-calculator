//math functions are based off of a operate function that calls the other functions, and then returns the answer

function operate(num1, num2, operator) {
    // based on the operator, call the correct math function
    if (operator === "+") {
        return add(num1, num2);
    }
    else if (operator === "-") {
        return subtract(num1, num2);
    }
    else if (operator === "*") {
        return multiply(num1, num2);
    }
    else if (operator === "/") {
        return divide(num1, num2);
    }
    else {
        return "Invalid operator";
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) { //divide by 0 error handled within solve function
        return num1 / num2;
}

//the solve function will go inside out and solve the equation using solve
//equation will be in a string format, eg: "5(2+3)/2"
//order of operations is PEMDAS, Parenthesis, Exponents, Multiplication, Division, Addition, Subtraction
function solve(equation) {
    // find the first parenthesis
    let firstParenthesis = equation.indexOf("(");
    // if there is a parenthesis, find the matching parenthesis
    if (firstParenthesis !== -1) {
        let secondParenthesis = equation.indexOf(")", firstParenthesis);
        // if there is a matching parenthesis, solve the equation inside the parenthesis
        if (secondParenthesis !== -1) {
            let insideParenthesis = equation.substring(firstParenthesis + 1, secondParenthesis);
            let insideParenthesisSolution = solve(insideParenthesis);
            // replace the equation inside the parenthesis with the solution
            equation = equation.replace("(" + insideParenthesis + ")", insideParenthesisSolution);
            // solve the new equation
            return solve(equation);
        }
        else {
            return "Invalid equation";
        }
    }
    // if there is no parenthesis, find the first exponent
    let firstExponent = equation.indexOf("^");
    // if there is an exponent, solve the equation
    if (firstExponent !== -1) {
        let num1 = equation.substring(0, firstExponent);
        let exponent = equation.substring(firstExponent + 1);
        let solution = Math.pow(num1, exponent);
        return solution;
    }
    // if there is no exponent, find the first multiplication or division
    let firstMultiplication = equation.indexOf("*");
    let firstDivision = equation.indexOf("/");
    // if there is a multiplication, solve the equation
    if (firstMultiplication !== -1) {
        let num1 = equation.substring(0, firstMultiplication);
        let num2 = equation.substring(firstMultiplication + 1);
        //if one of the two numbers is 0, return an error
        if (num1 === 0 || num2 === 0) {
            return "Cannot multiply by 0";
        }
        let solution = operate(num1, num2, "*");
        return solution;
    }
    // if there is a division, solve the equation
    else if (firstDivision !== -1) {
        let num1 = equation.substring(0, firstDivision);
        let num2 = equation.substring(firstDivision + 1);
        let solution = operate(num1, num2, "/");
        return solution;
    }
    // if there is no multiplication or division, find the first addition or subtraction
    let firstAddition = equation.indexOf("+");
    let firstSubtraction = equation.indexOf("-");
    // if there is an addition, solve the equation
    if (firstAddition !== -1) {
        let num1 = equation.substring(0, firstAddition);
        let num2 = equation.substring(firstAddition + 1);
        let solution = operate(num1, num2, "+");
        return solution;
    }
    // if there is a subtraction, solve the equation
    else if (firstSubtraction !== -1) {
        let num1 = equation.substring(0, firstSubtraction);
        let num2 = equation.substring(firstSubtraction + 1);
        let solution = operate(num1, num2, "-");
        return solution;
    }
}

//attaching the functions to the UI buttons below
let equation = ""; //equation will be a string that gets updated as the user clicks buttons & will be cleared when the clear button is clicked

