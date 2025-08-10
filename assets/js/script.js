const clickSound = document.getElementById("clickSound");
clickSound.volume = 0.5; 
let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

// Load saved history from localStorage
let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
let historyList = document.getElementById('historyList');
function renderHistory() {
  historyList.innerHTML = history.map(item => `<p>${item}</p>`).join("");
}
renderHistory();

// Save history to localStorage
function saveHistory() {
  localStorage.setItem('calcHistory', JSON.stringify(history));
}

// Add a calculation to history
function updateHistory(expression, result) {
  history.unshift(`${expression} = ${result}`);
  saveHistory();
  renderHistory();
}

// Clear History button
document.getElementById('clearHistory').addEventListener('click', () => {
  history = [];
  saveHistory();
  renderHistory();
});

arr.forEach(button => {
  button.addEventListener('click', (e) => {
    clickSound.currentTime = 0;
    clickSound.play();

    let btn = e.target.innerHTML;

    if (btn == '=') {
      try {
        let result = eval(string);
        updateHistory(string, result);
        string = result.toString();
        input.value = string;
      } catch {
        input.value = "Error";
        string = "";
      }
    } else if (btn == 'AC') {
      string = "";
      input.value = string;
    } else if (btn == 'DEL') {
      string = string.substring(0, string.length - 1);
      input.value = string;
    }
    // Advanced functions
    else if (btn == 'sin') {
      string = Math.sin(eval(string) * Math.PI/180).toString();
      input.value = string;
    }
    else if (btn == 'cos') {
      string = Math.cos(eval(string) * Math.PI/180).toString();
      input.value = string;
    }
    else if (btn == 'tan') {
      string = Math.tan(eval(string) * Math.PI/180).toString();
      input.value = string;
    }
    else if (btn == '√') {
      string = Math.sqrt(eval(string)).toString();
      input.value = string;
    }
    else if (btn == 'log') {
      string = Math.log10(eval(string)).toString();
      input.value = string;
    }
    else if (btn == 'x²') {
      string = Math.pow(eval(string), 2).toString();
      input.value = string;
    }
    else if (btn == 'π') {
      string += Math.PI.toString();
      input.value = string;
    }
    else if (btn == 'e') {
      string += Math.E.toString();
      input.value = string;
    }
    else {
      string += btn;
      input.value = string;
    }
  });
});
