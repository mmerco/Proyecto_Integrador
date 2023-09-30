const quantity = document.querySelector('#value');
const add = document.querySelector('#add');
const subtract = document.querySelector('#subtract');

const min = Number(quantity.min);
const max = Number(quantity.max);



add.addEventListener('click', () => {
  
  let value = Number(quantity.value);
  
  if (isNaN(value)) {
    value = 0;
  }

  if (value >= max) {
    quantity.value = max;
  } else {
    
    if (value < min) {
      quantity.value = min;
    } else {
      quantity.value = value + 1;
    }
  }
});


subtract.addEventListener('click', () => {
  
  let value = Number(quantity.value);

  if (isNaN(value)) {
    value = 0;
  }

  if (value <= min) {
    quantity.value = min;
  } else {
    
    if (value > max) {
      quantity.value = max;
    } else {
      quantity.value = value - 1;
    }
  }
});