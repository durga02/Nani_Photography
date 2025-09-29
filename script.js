// Navbar toggle
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Slider
let currentIndex = 0;
const slides = document.querySelectorAll(".slides img");
const slidesContainer = document.querySelector(".slides");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const dots = document.querySelectorAll(".dot");

function showSlide(index){
  slides.forEach((img,i)=>{
    img.style.display = i===index?"block":"none";
    dots[i].classList.toggle("active", i===index);
  });
}
function nextSlide(){
  currentIndex=(currentIndex+1)%slides.length;
  showSlide(currentIndex);
}
function prevSlide(){
  currentIndex=(currentIndex-1+slides.length)%slides.length;
  showSlide(currentIndex);
}
showSlide(currentIndex);

// Arrows
leftArrow.addEventListener("click",()=>{ prevSlide(); resetInterval(); });
rightArrow.addEventListener("click",()=>{ nextSlide(); resetInterval(); });

// Dots
dots.forEach(dot=>{
  dot.addEventListener("click", e=>{
    currentIndex=parseInt(e.target.dataset.index);
    showSlide(currentIndex);
    resetInterval();
  });
});

// Auto-slide
let slideInterval=setInterval(nextSlide,3000);
function resetInterval(){
  clearInterval(slideInterval);
  slideInterval=setInterval(nextSlide,3000);
}

// Swipe
let startX=0,endX=0;
slidesContainer.addEventListener("touchstart",e=>startX=e.touches[0].clientX);
slidesContainer.addEventListener("touchmove",e=>endX=e.touches[0].clientX);
slidesContainer.addEventListener("touchend",()=>{
  if(startX-endX>50){ nextSlide(); resetInterval(); }
  else if(endX-startX>50){ prevSlide(); resetInterval(); }
});

