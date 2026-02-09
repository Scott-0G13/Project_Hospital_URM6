
const navActive = document.querySelector("nav ul");
const btnToggle = document.querySelector(".toggle");
const lines = document.querySelectorAll(".line");

btnToggle.addEventListener('click',()=>{
    btnToggle.classList.toggle("active");
    navActive.classList.toggle("active");
});

let resizeDoc ;
window.addEventListener('resize',()=>{
    navActive.classList.add("no-transition");
    btnToggle.classList.add("no-transition");
    lines.forEach(line => line.classList.add("no-transition"));
    clearTimeout(resizeDoc);
    resizeDoc = setTimeout(()=>{
        navActive.classList.remove("no-transition");
        btnToggle.classList.remove("no-transition");
        lines.forEach(line => line.classList.remove("no-transition"));    
    },400);
    if(window.innerWidth>=768){
        navActive.classList.remove("active");
        btnToggle.classList.remove("active");
        
    }
});

// dots slide
const slideDots = document.querySelectorAll(".dots");
// Imgage slider

const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".previous-btn");
const Imgages = document.querySelectorAll(".slide-img");
let index = 0;
let startX = 0;
let startY = 0;
nextBtn.addEventListener('click',handleIndex);
previousBtn.addEventListener('click',handleIndex);

function handleIndex(e){
    Imgages[index].classList.remove("active");
    slideDots[index].classList.remove("active");
    index = index + Number(e.target.getAttribute("data-action"));
    if(index < 0){
        index = Imgages.length - 1;
    }
    else if(index > Imgages.length -1){
        index = 0;
    }

    slideDots[index].classList.add("active");
    Imgages[index].classList.add("active");
    
}

const slider = document.querySelector(".slider");
slider.addEventListener('touchstart',(e)=>{
    startX = e.touches[0].clientX;
});
slider.addEventListener('touchend',(e)=>{
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    if(diffX>50){
        nextBtn.click();
    }
    else if(diffX < -50){
        previousBtn.click();
    }
});

document.addEventListener('keydown',(e)=>{
    if(e.key==="ArrowLeft"){
        previousBtn.click();
    }
    if(e.key ==="ArrowRight"){
        nextBtn.click();
    }
});

let slideTime ;
function startAnimation(){
    slideTime = setInterval(()=>{
        nextBtn.click();
    },3000)
}
slider.addEventListener('mouseenter',()=>{
    clearInterval(slideTime)

});
slider.addEventListener('mouseleave',()=>startAnimation());
startAnimation();

