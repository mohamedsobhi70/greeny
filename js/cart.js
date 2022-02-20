if (localStorage.getItem("productsInCart")) {
  let cart = JSON.parse(localStorage.getItem("productsInCart"));
  for (let i = 0; i < cart.length; i++) {
    document.querySelector(".cart").innerHTML += `
   <div class="row border-bottom p-1 text-center align-items-center">
   <div class="col-3 "><img width="100px" src=".${cart[i].img}" alt=""></div>
   <div class="col-2 "><span class="fw-bold">${
     cart[i].price
   } </span> dollar</div>
   <div class="col-2 "><input type="number" min="1" value=${
     cart[i].qty
   }  class="form-control"></div>
   <div class="col-3 ">${cart[i].qty * cart[i].price}</div>
   <div class="col-2 "><button class="btn btn-danger">Remove</button></div>
</div>
   `;
  }
}
if (
  !localStorage.getItem("productsInCart") ||
  localStorage.getItem("productsInCart") == "[]"
) {
  document.querySelector(
    ".cart"
  ).innerHTML = `<h3 class="text-center py-3 border text-danger"> Cart Empty</h3>`;
}
