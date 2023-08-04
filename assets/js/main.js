const contentContainer = document.querySelector("#content-container");
const cartCounterLabel = document.querySelector("#cart-counter-label");
const basket = document.querySelector("#basket");
const shop = document.querySelectorAll(".item-actions__cart");
const sum = document.querySelectorAll(".sum")[0];
const backgroundBasket = document.querySelectorAll(".background-basket")[0];
const deleted = document.querySelector(".delete");
const nonesVisible = document.querySelectorAll(".none")[0];
const orders = document.querySelector(".order");

let cartPrice = 0;
let cartCounter = 0;
let isBasketVisible = false;

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

  let restoreHTML = null;

  if (typeof target !== "object") return;
  if (!target.matches(".item-actions__cart")) return;

  incrementCounter(cartCounterLabel, ++cartCounter);
  cartPrice = getPrice(target, cartPrice);

  restoreHTML = target.innerHTML;
  target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

  disableControls(target, contentContainer, btnClickHandler);

  const promise = new Promise((resolve) => {
    funkSum();
    setTimeout(() => {
      enableControls(target, contentContainer, btnClickHandler);
      target.innerHTML = restoreHTML;

      resolve();
    }, interval);
  });

  promise.then(() => {
    funkSum();
    if (cartPrice == 0) {
      sum.innerHTML = ``;
    }
  });
};

contentContainer.addEventListener("click", btnClickHandler);

shop.forEach((el) => {
  el.addEventListener("click", () => {
    deleteBlank();
    deleteOrder();
  });
});

deleted.addEventListener("click", (e) => {
  if (!e.target.matches(".background-basket")) {
    if (cartCounter >= 0) {
      toggleVisible()
      del();
    }
  }
});

basket.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!e.target.matches(".background-basket")) {
    if (cartCounter > 0) {
      toggleVisible()
    } else if (cartCounter == 0) {
      toggleNonesVisible()
      deleteBlank();
    }
  }
});

orders.addEventListener("click", (e) => {
  e.stopPropagation();
  if (!e.target.matches(".background-basket")) {
    if (cartCounter >= 0) {
      toggleVisible()
      toggleNonesVisible()
      console.log("Order clicked!");
      orderBlank();
      del();
    }
  }
});

function toggleNonesVisible() {
  nonesVisible.classList.toggle("nonesVisibles");
}

function toggleVisible() {
  backgroundBasket.classList.toggle("visibles");
}

function deleteBlank() {
  nonesVisible.innerHTML = `Пустая корзина <br> =(`;
}

function deleteOrder() {
  nonesVisible.classList.remove("nonesVisibles");
}

function orderBlank() {
  nonesVisible.innerHTML = `Заказ оформлен =)`;
}

function funkSum() {
  sum.innerHTML = `Сумма: ${cartPrice}$ <br> Кол-во товаров: ${cartCounter}`;
}

function incrementCounter($label, counter) {
  $label.innerHTML = `${counter}`;
  $label.style.display = "block";
}

function del() {
  cartPrice = 0;
  cartCounter = 0;
  sum.innerHTML = ``;
  cartCounterLabel.innerHTML = 0;
  cartCounterLabel.style.display = "none";
}

function getMockData(target) {
  return +target.parentElement.previousElementSibling.innerHTML.replace(
    /^\$(\d+)\s\D+(\d+).*$/,
    "$1.$2"
  );
}

function getPrice(target, price) {
  return Math.round((price + getMockData(target)) * 100) / 100;
}

function disableControls(target, $container, handler) {
  target.disabled = true;
  $container.removeEventListener("click", handler);
}

function enableControls(target, $container, handler) {
  target.disabled = false;
  $container.addEventListener("click", handler);
}
