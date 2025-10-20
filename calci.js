function appendToDisplay(value) {
  const input = document.getElementById('input');
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const currentValue = input.value;

  // Special handling for square root to add closing parenthesis
  if (value === 'Math.sqrt(') {
    input.value = currentValue.slice(0, start) + value + ')' + currentValue.slice(end);
    input.selectionStart = input.selectionEnd = start + value.length;
  } else {
    input.value = currentValue.slice(0, start) + value + currentValue.slice(end);
    input.selectionStart = input.selectionEnd = start + value.length;
  }
  
  input.focus();
  liveCalculate(); // update output
}

function clearDisplay() {
  document.getElementById('input').value = '';
  document.getElementById('output').textContent = '0';
}

function calculate() {
  const input = document.getElementById('input');
  try {
    const result = eval(input.value);
    document.getElementById('output').textContent = result;
    // Optional: update input to show result
    input.value = result;
    input.focus();
  } catch (e) {
    document.getElementById('output').textContent = 'Error';
  }
}

function liveCalculate() {
  const inputValue = document.getElementById('input').value;
  try {
    if (inputValue.trim() === '') {
      document.getElementById('output').textContent = '0';
    } else {
      const result = eval(inputValue);
      document.getElementById('output').textContent = result;
    }
  } catch {
    document.getElementById('output').textContent = 'Error';
  }
}

// Live update on typing
document.getElementById('input').addEventListener('input', liveCalculate);

// Keyboard support
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  // Number keys
  if (/^[0-9]$/.test(key)) {
    appendToDisplay(key);
  }
  // Operator keys
  else if (key === '+') {
    appendToDisplay('+');
  } else if (key === '-') {
    appendToDisplay('-');
  } else if (key === '*') {
    appendToDisplay('*');
  } else if (key === '/') {
    appendToDisplay('/');
  } else if (key === '.') {
    appendToDisplay('.');
  } else if (key === '(') {
    appendToDisplay('(');
  } else if (key === ')') {
    appendToDisplay(')');
  } 
  // Enter key for calculation
  else if (key === 'Enter') {
    calculate();
  }
  // Escape key for clear
  else if (key === 'Escape') {
    clearDisplay();
  }
  // Backspace key
  else if (key === 'Backspace') {
    const input = document.getElementById('input');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const currentValue = input.value;
    
    if (start === end) {
      // Remove one character before cursor
      input.value = currentValue.slice(0, Math.max(0, start - 1)) + currentValue.slice(end);
      input.selectionStart = input.selectionEnd = Math.max(0, start - 1);
    } else {
      // Remove selected text
      input.value = currentValue.slice(0, start) + currentValue.slice(end);
      input.selectionStart = input.selectionEnd = start;
    }
    
    input.focus();
    liveCalculate();
  }
  
  // Prevent default behavior for handled keys
  if (/^[0-9+\-*/.=()]$/.test(key) || key === 'Enter' || key === 'Escape' || key === 'Backspace') {
    event.preventDefault();
  }
});
