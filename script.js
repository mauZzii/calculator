const BUTTONS = document.querySelectorAll('.symbol');
const INPUT = document.querySelector('.calc-input');
const HISTORY = document.querySelector('.calc-history');
const OPERATORS = document.querySelector('.operator');
const EQUALBTN = document.querySelector('#equal');
const DECIMAL = document.querySelector('#decimal');

let displayHistory = '';
let displayInput = '';

let action = '';
let num1 = '';
let num2 = '';

//operations
const addition = (a, b) => a + b;

const subtraction = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => {
    if (b === 0) {
        return "heh you thought"
    } else {
        return a / b;
    }
};

const power = (a, b) => {
    let answer = 1;
    for (let i = 0; i < b; i+=1) {
        answer *= a;
    };
};

//round to two places
function roundNumber(calculation) {
    const rounded = Math.round(calculation * 100) / 100;
    return rounded;
};

function calculate(job, firstNum, secondNum) {
    switch (true) {
        case (job === 'addition'): 
            displayInput = addition(+firstNum, +secondNum);
            break;
        case (job === 'subtraction'):
            displayInput = subtraction(+firstNum, +secondNum);
            break;
        case (job === 'multiply'):
            displayInput = multiply(+firstNum, +secondNum);
            break;
        case (job === 'divide'):
            displayInput = divide(+firstNum, +secondNum);
            break;
        case (job === 'power'):
            displayInput = power(+firstNum, +secondNum);
            break;
    };
    action = '';
    num1 = '';
    num2 = '';

    //will give a statement if trying to divide by zero
    if (displayInput !== 'heh you thought') {
        return roundNumber(displayInput);
    };
        return displayInput;
};

//shows calculation history based off operator
function showLast(symbol) {
    switch (true) {
        case (symbol === 'add'):
            displayHistory = `${num1}+${num2}=${calculate(action, num1, num2)}`;
            break;
        case (symbol === 'subtract'):
            displayHistory = `${num1}-${num2}=${calculate(action, num1, num2)}`;
            break;
        case (symbol === 'multiply'):
            displayHistory = `${num1}*${num2}=${calculate(action, num1, num2)}`;
            break;
        case (symbol === 'divide'):
            displayHistory = `${num1}/${num2}=${calculate(action, num1, num2)}`;
            break;
        case (symbol === 'power'):
            displayHistory = `${num1}^${num2}=${calculate(action, num1, num2)}`;
            break;
    };
        return displayHistory;
};

//allows for button state declaration
function setOperatorBtnState(state) {
    OPERATORS.forEach((operator) => {
      if (state === 'disable' || displayInput === 'heh you thought' || displayInput === Infinity) {
        operator.setAttribute('disabled', '');
      } else if (state === 'enable') {
        operator.removeAttribute('disabled', '');
      };
    });
};
  
  function setEqualBtnState(state) {
    if (action === '' || state === 'disable') {
      EQUALBTN.setAttribute('disabled', '');
    } else {
      EQUALBTN.removeAttribute('disabled', '');
    };
};

//inputs num1 if it is empty and inputs num2 if operator hasn't been chosen
function operate(button) {
    DECIMAL.removeAttribute('disabled', '');
    if (num1 === '') {
      num1 = INPUT.textContent;
      action = button.id;
    } else if (num1 !== '' && action !== '') {
      num2 = INPUT.textContent;
      HISTORY.textContent = showLast(action);
      num1 = calculate(action, num1, num2);
      action = button.id;
    };
    setOperatorBtnState('disable');
    setEqualBtnState('disable');
    INPUT.textContent = '';
};

function clearDisplay(task) {
    if (task === 'clear') {
      setOperatorBtnState('enable');
      DECIMAL.removeAttribute('disabled', '');
      EQUALBTN.removeAttribute('disabled', '');
      HISTORY.textContent = '';
      INPUT.textContent = '';
      displayHistory = '';
      displayInput = '';
      action = '';
      num1 = '';
      num2 = '';
    } else if (task === 'backspace') {
      INPUT.textContent = INPUT.textContent.slice(0, -1);
      if (!INPUT.textContent.includes('.')) {
        DECIMAL.removeAttribute('disabled', '');
      };
    };
};

function displayNumber(button) {
    if (action === 'equal' || displayInput === 'heh you thought' || displayInput === Infinity) {
      clearDisplay('clear');
    };
    if (INPUT.textContent === '0') {
      INPUT.textContent = button.textContent;
    } else {
      INPUT.textContent += button.textContent;
    };
    setEqualBtnState();
    setOperatorBtnState('enable');
};

function displayDecimal(button) {
    if (displayInput !== '' && action === 'equals') {
      clearDisplay('clear');
      INPUT.textContent += button.textContent;
    } else if (INPUT.textContent === '' || INPUT.textContent === '.') {
      INPUT.textContent = button.textContent;
    } else if (INPUT.textContent !== '' && INPUT.textContent.includes('.')) {
      button.setAttribute('disabled', '');
    } else {
      INPUT.textContent += button.textContent;
    };
};

//button listener
function buttonListener() {
    BUTTONS.forEach((button) => {
        button.addEventListener('click', () => {
            if (button.classList.contains('num-btn')) {
                displayNumber(button);
                // console.log(displayInput.textContent);
            } else if (button.classList.contains('operator')) {
                operate(button);
            } else if (button.id === 'decimal') {
                displayDecimal(button);
            } else if (button.id === 'equal') {
                operate(button);
                setOperatorBtnState('enable');
            } else if (button.id === 'backspace') {
                clearDisplay('back');
            } else if (button.id === 'clear') {
                clearDisplay('clear');
            };
        });
    });
};

buttonListener();