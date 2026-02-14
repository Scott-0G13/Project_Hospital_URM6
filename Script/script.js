const navActive = document.querySelector("nav ul");
const btnToggle = document.querySelector(".toggle");
const lines = document.querySelectorAll(".line");

if (btnToggle && navActive) {
    btnToggle.addEventListener('click', ()=>{
        btnToggle.classList.toggle("active");
        navActive.classList.toggle("active");
    });
}

let resizeDoc;
window.addEventListener('resize', ()=>{
    if (navActive) navActive.classList.add("no-transition");
    if (btnToggle) btnToggle.classList.add("no-transition");
    if (lines && lines.length) lines.forEach(line => line.classList.add("no-transition"));
    clearTimeout(resizeDoc);
    resizeDoc = setTimeout(()=>{
        if (navActive) navActive.classList.remove("no-transition");
        if (btnToggle) btnToggle.classList.remove("no-transition");
        if (lines && lines.length) lines.forEach(line => line.classList.remove("no-transition"));
    },400);
    if(window.innerWidth>=768){
        if (navActive) navActive.classList.remove("active");
        if (btnToggle) btnToggle.classList.remove("active");
    }
});

// dots slide (guarded: only attach if elements exist)
const slideDots = document.querySelectorAll(".dots");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".previous-btn");
const Imgages = document.querySelectorAll(".slide-img");
const slider = document.querySelector(".slider");
let index = 0;
let startX = 0;
let startY = 0;

if (nextBtn && previousBtn && Imgages.length && slideDots.length) {
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

    if (slider) {
        slider.addEventListener('touchstart',(e)=>{ startX = e.touches[0].clientX; });
        slider.addEventListener('touchend',(e)=>{
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            if(diffX>50){ nextBtn.click(); }
            else if(diffX < -50){ previousBtn.click(); }
        });

        slider.addEventListener('mouseenter',()=>{ clearInterval(slideTime); });
        slider.addEventListener('mouseleave',()=>startAnimation());
    }

    document.addEventListener('keydown',(e)=>{
        if(e.key==="ArrowLeft"){ previousBtn.click(); }
        if(e.key ==="ArrowRight"){ nextBtn.click(); }
    });

    let slideTime;
    function startAnimation(){ slideTime = setInterval(()=>{ nextBtn.click(); },3000); }
    startAnimation();
}

document.addEventListener('click', function(e){
    // voir plus
    if(e.target && e.target.classList && e.target.classList.contains('show-more')){
        const btn = e.target;
        const extra = btn.nextElementSibling;
        if(extra && extra.classList.contains('extra-text')){
            extra.classList.add('open');
            btn.classList.add('hidden');
        }
    }

    if(e.target && e.target.classList && e.target.classList.contains('close-more')){
        e.preventDefault();
        const close = e.target;
        const extra = close.closest('.extra-text');
        if(extra){
            extra.classList.remove('open');
            const btn = extra.previousElementSibling;
            if(btn && btn.classList && btn.classList.contains('show-more')){
                btn.classList.remove('hidden');
            }
        }
    }
});

(function(){
    const filters = document.querySelectorAll('.btn-filtre');
    const cards = document.querySelectorAll('.card-grid .card');
    if(!filters.length || !cards.length) return;

    filters.forEach(btn => btn.addEventListener('click', function(){
        const filter = this.getAttribute('data-filter');

        filters.forEach(b=>b.classList.remove('active'));
        this.classList.add('active');

        if(filter === 'all'){
            cards.forEach(c=> c.classList.remove('hidden'));
            return;
        }

        cards.forEach(c=>{
            const cat = c.getAttribute('data-category') || '';
            if(cat.toLowerCase() === filter.toLowerCase()){
                c.classList.remove('hidden');
            } else {
                c.classList.add('hidden');
            }
        });
    }));
})();
