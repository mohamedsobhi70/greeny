var productsInCart;
if (localStorage.getItem("productsInCart")) {
  productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
} else {
  productsInCart = [];
}
localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
//add class fixed-bottom to the cart section
let cartSection = document.querySelector(".carts");
window.onresize = function () {
  if (window.innerWidth < 768) {
    cartSection.classList.add("fixed-bottom", "border-top", "py-2");
  } else {
    // delete the fixed-bottom to the carts section
    cartSection.classList.remove("fixed-bottom", "border-top", "py-2");
  }
};

if (window.innerWidth < 768) {
  cartSection.classList.add("fixed-bottom", "border-top", "py-2");
} else {
  cartSection.classList.remove("fixed-bottom", "border-top", "py-2");
}
cartFunctionality();
// calculate the number of wish items
document.querySelectorAll(".fa-heart").forEach((el) => {
  el.addEventListener("click", function () {
    document.querySelector(".wish-num").innerHTML =
      document.querySelectorAll(".fa-heart.active").length;
  });
});

// add class active to the heart
document.querySelectorAll(".fa-heart").forEach((el) => {
  el.addEventListener("click", function () {
    this.classList.toggle("active");
    this.classList.toggle("heart-anmi");
  });
});

// display sold items section

fetch("./js/products.json")
  .then((res) => res.json())
  .then((data) => {
    let itemsSection = document.querySelector(".sold-items .items-section");
    data.soldProducts.forEach(
      (product) =>
        (itemsSection.innerHTML += `    <div class="col-6 col-md-4 col-lg-3 col-xl-2 mb-3">
                        <div class="sold-item bg-white text-center p-3 rounded-3">
                            <div class="d-flex justify-content-between align-items-center">
                                <span class="sale px-3 rounded-3 text-white fw-bold">Sale</span>
                                <i class="fa fa-heart"></i>
                            </div>
                            <div class="img-box border-bottom overflow-hidden">
                                <img src=${
                                  product.img
                                } class="img-fluid" alt="item">
                            </div>
                            <div class="item-info py-3 text-center">
                                <div class="d-flex justify-content-center">
                                    <i class="fa fa-star px-1 text-warning"></i>
                                    <i class="fa fa-star px-1 text-warning"></i>
                                    <i class="fa fa-star px-1 text-warning"></i>
                                    <i class="fa fa-star px-1 text-warning"></i>
                                    <i class="fa fa-star px-1 text-secondary"></i>
                                </div>
                                <h6 class="fw-bold text-capitalize my-1">${
                                  product.productName
                                }</h6>
                                <div class="price ">
                                    <span class="newprice text-main-color fw-bold">${
                                      product.price - product.discount
                                    }</span>
                                    <span class="oldprice text-danger text-decoration-line-through">${
                                      product.price
                                    }$</span>
                                </div>
                            </div>
                            <button class="btn bg-e w-100 add-tocart"><i
                                    class="fa fa-shopping-basket mx-1"></i>Add</button>
                        </div>
                    </div>
    `)
    );
    console.log(data.soldProducts);
    return data;
  })
  .then((data) => {
    cartFunctionality();
    return data;
  });

function cartFunctionality() {
  // add to cart functionality
  if (localStorage.getItem("productNum")) {
    document.querySelector(".cart-num").innerHTML =
      localStorage.getItem("productNum");
  }
  // calculate the number of the product in cart
  function increaseCartNum() {
    let productNum = +localStorage.getItem("productNum");
    if (productNum) {
      //if there is items in the cart
      localStorage.setItem("productNum", productNum + 1);
      //display the number in the page
      document.querySelector(".cart-num").innerHTML =
        localStorage.getItem("productNum");
    } else {
      //if there is no items in cart put the initial value  1
      localStorage.setItem("productNum", 1);
      document.querySelector(".cart-num").innerHTML = "1"; //display the number in the page
    }
  }

  let addToCartBtns = document.querySelectorAll(".add-tocart");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      increaseCartNum();
      let productInfo = {
        name: btn.parentElement.querySelector("h6").innerHTML,
        img: btn.parentElement.querySelector("img").getAttribute("src"),
        price: btn.parentElement.querySelector(".newprice").innerHTML,
        qty: 1,
      };
      if (
        JSON.parse(localStorage.getItem("productsInCart")).findIndex(
          (product) => product.name == productInfo.name
        ) != -1
      ) {
        productsInCart[
          productsInCart.findIndex(
            (product) => product.name == productInfo.name
          )
        ].qty++;
      } else {
        productsInCart.push(productInfo);
      }
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
      console.log(productInfo);
    });
  });
}
