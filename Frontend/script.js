const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
   mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
  mobileMenu.classList.toggle("opacity-0");
   menuBtn.classList.toggle("rotate-90")
  
});


 

 
       




 

//*******products */

const products = document.querySelectorAll(".product");

const pagination = document.getElementById("pagination");


const productsPerPage = 3;

let currentPage = 1;

const totalPages = Math.ceil(products.length / productsPerPage);


function showProducts(page) {

    currentPage = page;

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;

    products.forEach((product, index) => {

        if (index >= start && index < end) {

            product.classList.remove("hidden");

        } else {

            product.classList.add("hidden");

        }

    });

    createPagination();

}


function createPagination() {

    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        button.className =
        "px-4 py-2 mx-1 rounded bg-white hover:bg-pink-600 hover:text-white text-black";

        button.addEventListener("click", () => {

            showProducts(i);

        });

        pagination.appendChild(button);

    }

}


showProducts(1);





