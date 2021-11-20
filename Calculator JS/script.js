function calculateResult(first_operand_el, operator_el, second_operand_el) {
    let first_operand = parseFloat(first_operand_el.textContent);
    let second_operand = parseFloat(second_operand_el.textContent);
    let operator = operator_el.textContent;
    switch (operator) {
        case '+':
            return first_operand + second_operand;
        case '-':
            return first_operand - second_operand;
        case 'x':
            return first_operand * second_operand;
        case '÷':
            return first_operand / second_operand;
    }   
}

function updateOperands(e) {
    let number_el = e.target;  
    if (operator_el.textContent == "") 
        first_operand_el.textContent += number_el.textContent;
    else
        second_operand_el.textContent += number_el.textContent
}

function selectOperator(e) {
    let selected_operator_el = e.target;
    if (first_operand_el.textContent && operator_el.textContent && second_operand_el.textContent){
        evaluateExpression();
        operator_el.textContent = selected_operator_el.textContent;
    }
    
    else if (first_operand_el.textContent && operator_el.textContent == "")
        operator_el.textContent = selected_operator_el.textContent

    else if (selected_operator_el.textContent == "-") 
        insertNegativeSign();  
}

function evaluateExpression() {
    if (first_operand_el.textContent && operator_el.textContent && second_operand_el.textContent) {
        let result = calculateResult(first_operand_el, operator_el, second_operand_el);
        let equation = `${first_operand_el.textContent} ${operator_el.textContent} ${second_operand_el.textContent} = ${result}`;
        updateHistory(equation)
        first_operand_el.textContent = result
        operator_el.textContent = second_operand_el.textContent = ""
    }
}

function insertNegativeSign() {
    if (first_operand_el.textContent == "")
        first_operand_el.textContent += "-"
    else if (first_operand_el.textContent && operator_el.textContent)
        second_operand_el.textContent += "-"
}
function clearAll() {
    first_operand_el.textContent = second_operand_el.textContent = operator_el.textContent = ""
}

function deleteLast() {
    let expression = `${first_operand_el.textContent} ${operator_el.textContent} ${second_operand_el.textContent}`;
    if (expression) 
        expression = expression.trim().slice(0, -1);
    [first_operand_el.textContent, operator_el.textContent, second_operand_el.textContent] = expression.split(" ");  
}

function usePrevCalculation(e) {
    let element = e.target;
    if (element.className == "history-expression") 
        [first_operand_el.textContent, operator_el.textContent, second_operand_el.textContent] = element.textContent.split(" ");  
    
    else {
        first_operand_el.textContent = element.textContent;
        second_operand_el.textContent = operator_el.textContent = "";
    }
}

function updateHistory(equation) {
    calculations_history.pop();
    calculations_history.unshift(equation);
    for (let i = 0; i < 10; i++) {
        if (calculations_history[i]) {
        [expression, result] = calculations_history[i].split("=")
        history_expressions[i].textContent = expression + " " + "=" + " ";
        history_results[i].textContent = result;
        }
    }
}
let first_operand_el = document.querySelector("#first-operand")
let second_operand_el = document.querySelector("#second-operand")
let operator_el = document.querySelector("#operator")
let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator-symbol");
let equals = document.querySelector(".equals-sign")
let clear = document.querySelector(".clear");
let del = document.querySelector(".delete")
let history = document.querySelectorAll("p")
let history_expressions = document.querySelectorAll(".history-expression")
let history_results = document.querySelectorAll(".history-result")
let calculations_history = Array(10);
numbers.forEach(el => el.addEventListener('click', updateOperands));
operators.forEach(el => el.addEventListener('click', selectOperator));
equals.addEventListener('click', evaluateExpression);
clear.addEventListener('click', clearAll);
del.addEventListener('click', deleteLast);
history.forEach(el => el.addEventListener('click', usePrevCalculation));



