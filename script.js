"use strict";

const arrowLeft = document.querySelector(".btn-left");
const arrowRight = document.querySelector(".btn-right");
const productImg = document.querySelector(".hero-image");
const modalImg = document.querySelector(".modal-overlay");
const closeModal = document.querySelector(".close-modal");
const btnPlus = document.querySelector(".plus");
const btnMinus = document.querySelector(".minus");
const quantityDisp = document.querySelector(".btn-quantity");
let val = 0;
let curPic = 1;
productImg.addEventListener("click", function (e) {
  const clicked = e.target;

  if (!clicked) return;

  modalImg.style.display = "block";
  modalImg.classList.add("overlay");
  modalImg.querySelector(".img-modal").classList.add("modal");
});
closeModal.addEventListener("click", function (e) {
  if (!e.target) return;
  modalImg.style.display = "none";
  modalImg.classList.remove("overlay");
  modalImg.querySelector(".img-modal").classList.remove("modal");
});

quantityDisp.addEventListener("click", function (e) {
  const clicked = e.target;

  if (!clicked || !clicked.closest(".btn")) return;

  if (clicked.closest(".btn").classList.contains("plus")) {
    val++;
  }
  if (clicked.closest(".btn").classList.contains("minus") && val > 0) {
    val--;
  }
  updateCart(val);
  const quant = document.querySelector(".cart-quantity").innerHTML;
  if (quant != 0) {
    document.querySelector(".cart-quantity").style.display = "block";
  } else {
    document.querySelector(".cart-quantity").style.display = "none";
  }
});

document.querySelector(".nav-cart").addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("drop-delete")) {
    val = 0;
    updateCart(val);
  } else return;
});

// FUNCTIONS USED //
// ===============================================//
const displayPic = function (curPic) {
  document.querySelector(
    ".img-main"
  ).src = `./images/image-product-${curPic}.jpg`;
  document
    .querySelector(".modal-overlay")
    .querySelector(".img-main").src = `./images/image-product-${curPic}.jpg`;
};
const htmlCart = function (val) {
  const price = (125 * val).toFixed(2);

  const html = `<div class="dropdown-content">
  <img class="dropdown-img" src="./images/image-product-1-thumbnail.jpg" />
    <div class="dropdown-prod">
      <div class="dropdown-prodname">Fall Limited Edition Sneakers</div>
      <div class="dropdown-prod-calc">$125.00 x <span class=";quant-change">${val}</span>  <span class="total-price">     $${price}</span></div>
    </div>
  <img class="drop-delete" src="./images/icon-delete.svg" />
</div>
<div class="checkout-btn">Checkout</div>`;
  return html;
};

const updateCart = function (val) {
  document.querySelector(".dropdown-inner").innerHTML = "";
  if (val == 0) {
    document
      .querySelector(".dropdown-inner")
      .insertAdjacentHTML(
        "afterbegin",
        `<span class="empty-cart">Your cart is Empty.</span>`
      );
    document.querySelector(".cart-quantity").style.display = "none";
  } else {
    document
      .querySelector(".dropdown-inner")
      .insertAdjacentHTML("afterbegin", htmlCart(val));
  }

  document.querySelector(".quantity").innerHTML = val;
  document.querySelector(".cart-quantity").innerHTML = val;
};

document
  .querySelector(".modal-overlay")
  .querySelector(".arrow-btn")
  .addEventListener("click", function (e) {
    const pics = e.target;
    const totalPics = document
      .querySelector(".other-images")
      .querySelectorAll(".img-thumbnail").length;

    if (pics.closest(".pic").classList.contains("btn-left") && curPic > 1) {
      curPic--;
    } else if (
      pics.closest(".pic").classList.contains("btn-right") &&
      curPic < totalPics
    ) {
      curPic++;
    } else return;
    displayPic(curPic);
  });
document.querySelector(".other-images").addEventListener("click", function (e) {
  const curimg = e.target.dataset.img;
  curPic = curimg;

  displayPic(curPic);
});
document
  .querySelector(".modal-overlay")
  .querySelector(".other-images")
  .addEventListener("click", function (e) {
    const curimg = e.target.dataset.img;
    curPic = curimg;

    displayPic(curPic);
  });

document.querySelector(".mob-menu").addEventListener("click", function () {
  document.querySelector(".menu-items").style.display = "block";
});
document.querySelector(".close-btn").addEventListener("click", function () {
  document.querySelector(".menu-items").style.display = "none";
});
