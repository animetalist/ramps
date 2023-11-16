function debounce(func, delay) {
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

const calculateResult = () => {
  const resultElement = document.getElementById('result');
  const calcDescr = document.getElementById('calcDescr');
  const calcBtns = document.getElementById('calcBtns');
  const heightInput = document.getElementById('height');
  const weightInput = document.getElementById('weight');
  const height = heightInput.value;
  const weight = weightInput.value;

  const isValidInput = !!height && !!weight;

  const valisResult = (height * weight) / 30;

  const result = isValidInput ? valisResult.toFixed() : 'X';

  resultElement.textContent = result;

  calcDescr.classList.toggle('hide', isValidInput);
  calcBtns.classList.toggle('show', isValidInput);
};

const setupInputValidation = (inputId, minValue, maxValue) => {
  const input = document.getElementById(inputId);

  function handleInput() {
    let inputValue = parseFloat(input.value);
    console.log('handleInput');

    if (inputValue < minValue) {
      input.value = minValue;
    } else if (inputValue > maxValue) {
      input.value = maxValue;
    }

    calculateResult();
  }
  const debouncedHandleInput = debounce(handleInput, 1000);
  input.addEventListener('input', debouncedHandleInput);
};

setupInputValidation('height', 0.2, 1.5);
setupInputValidation('weight', 500, 15000);
