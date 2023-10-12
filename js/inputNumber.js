/* FUNCTIONS */

const add = (element) => {

  let id = '#' + element.name;
  let quantity = document.querySelector(id);
  let min = Number(quantity.min);
  let max = Number(quantity.max);
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
}

const subtract = (element) => {

  let id = '#' + element.name;
  let quantity = document.querySelector(id);
  let min = Number(quantity.min);
  let max = Number(quantity.max);
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
}


/* LISTENER */

document.addEventListener('click', event => {
  
  let element = event.target;

  if ( !element.matches('.add') && !element.matches('.subtract') ) {
    return
  
  } else {

    if ( element.matches('.add') ) {
      add(element);
    }

    if ( element.matches('.subtract') ) {
      subtract(element);
    }
  }
});
