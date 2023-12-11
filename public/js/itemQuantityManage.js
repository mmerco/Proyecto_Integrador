/* FUNCTIONS */

// Función para dirigir a la ruta que agrega el item al carrito
const addToCart = (id, quantity) => {
  const data = { quantity: quantity };

  fetch(`/shop/item/${id}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(data).toString(),
  })
    .then(() => window.location.reload(true));
};


// Funcion para incrementar el input cuando se toca el boton "+"
const add = (element) => {

  let id = element.dataset.id;
  let quantity = document.querySelector(`input[name=${id}`);
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


// Funcion para decrementar el input cuando se toca el boton "-"
const subtract = (element) => {

  let id = element.dataset.id;
  let quantity = document.querySelector(`input[name=${id}]`);
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

  if (!element.matches('.add') && !element.matches('.subtract') && !element.matches('.quantity__add')) {
    return

  } else {

    if (element.matches('.add')) {
      add(element);
    }

    if (element.matches('.subtract')) {
      subtract(element);
    }

    if (element.matches('.quantity__add')) {
      let id = element.dataset.id;
      let name = element.name;
      let quantityInput = document.querySelector(`input[name=${name}]`);

      addToCart(id, quantityInput.value);
    }
  }
});
