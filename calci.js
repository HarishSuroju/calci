function appendToDisplay(value) {
  const input = document.getElementById('input');
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const currentValue = input.value;

  input.value = currentValue.slice(0, start) + value + currentValue.slice(end);
  input.selectionStart = input.selectionEnd = start + value.length;
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
