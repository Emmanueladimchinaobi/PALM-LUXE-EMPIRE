const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");
  mobileMenu.classList.add("flex");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("flex");
  mobileMenu.classList.add("hidden");
});
 const Clubbtn = document.getElementById("Club-btn");
 const Clubmenu = document.getElementById("Club-menu");
 Clubbtn.addEventListener("click", () => {
 Clubmenu.classList.toggle("hidden")

 });
 // Close the dropdown when clicking anywhere else
document.addEventListener("click", (e) => {
    if (
        !Clubbtn.contains(e.target) &&
        !Clubmenu.contains(e.target)
    ) {
        Clubmenu.classList.add("hidden");
    }
});
 const Brandsbtn = document.getElementById("Brands-btn");
 const Brandsmenu = document.getElementById("Brands-menu");
 Brandsbtn.addEventListener("click" , () => {
    Brandsmenu.classList.toggle("hidden");
 });

 // Close the dropdown when clicking anywhere else
document.addEventListener("click", (e) => {
    if (
        !Brandsbtn.contains(e.target) &&
        !Brandsmenu.contains(e.target)
    ) {
        Brandsmenu.classList.add("hidden");
    }
});


const shopbtn = document.getElementById("shop-btn");
 const shopmenu = document.getElementById("shop-menu");
 shopbtn.addEventListener("click" , () => {
    shopmenu.classList.toggle("hidden");
 });

 // Close the dropdown when clicking anywhere else
document.addEventListener("click", (e) => {
    if (
        !shopbtn.contains(e.target) &&
        !shopmenu.contains(e.target)
    ) {
        shopmenu.classList.add("hidden");
    }
});
 
const clubsbtn2 = document.getElementById("clubs-btn2");
const backbtn = document.getElementById("back-btn");

const mainMenu = document.getElementById("main-menu");
const submenu = document.getElementById("submenu");

// Open submenu
clubsbtn2.addEventListener("click", () => {
  mainMenu.classList.remove("translate-x-0");
  mainMenu.classList.add("-translate-x-full");

  submenu.classList.remove("translate-x-full");
  submenu.classList.add("translate-x-0");
});

// Go back
backbtn.addEventListener("click", () => {
  submenu.classList.remove("translate-x-0");
  submenu.classList.add("translate-x-full");

  mainMenu.classList.remove("-translate-x-full");
  mainMenu.classList.add("translate-x-0");
});

const brandsbtn = document.getElementById("brands-btn");
const brandbackbtn = document.getElementById("brand-backbtn");

const brandsmenu = document.getElementById("brands-menu");
const brandssubmenu = document.getElementById("brands-submenu");

// Open submenu
brandsbtn.addEventListener("click", () => {
  brandsmenu.classList.remove("translate-x-0");
  brandsmenu.classList.add("-translate-x-full");

  brandssubmenu.classList.remove("translate-x-full");
  brandssubmenu.classList.add("translate-x-0");
});

// Go back
brandbackbtn.addEventListener("click", () => {
  brandssubmenu.classList.remove("translate-x-0");
  brandssubmenu.classList.add("translate-x-full");

  brandsmenu.classList.remove("-translate-x-full");
  brandsmenu.classList.add("translate-x-0");
});


 const images = [
      "img/download (24).jfif",
      "img/Football kit wallpaper for smartphone.jfif",
      "img/Juventus.jfif",
      "img/download (24).jfif"
  ];

    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      document.getElementById("photo").src = images[currentIndex];
    }, 3000);

    function changeImage() {
      currentIndex = (currentIndex + 1) % images.length;
      document.getElementById("photo").src = images[currentIndex];
    };




