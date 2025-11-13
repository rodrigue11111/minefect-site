
// Reveal
(()=>{const els=document.querySelectorAll("[data-reveal]");const io=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("revealed");io.unobserve(x.target);}})},{threshold:.2});els.forEach((el,i)=>{el.style.animationDelay=(i*.06)+'s';io.observe(el);});})();
// Parallax
(()=>{const layers=document.querySelectorAll("[data-parallax]");const onScroll=()=>{const y=window.scrollY;layers.forEach(el=>{const s=parseFloat(el.dataset.speed||'0.2');el.style.transform=`translateY(${y*s}px)`;});};onScroll();window.addEventListener('scroll',onScroll,{passive:true});})();
// Kenburns
(()=>{const imgs=document.querySelectorAll("[data-kenburns]");imgs.forEach(img=>{img.style.transition="transform 18s ease-in-out";let d=1;setInterval(()=>{d*=-1;img.style.transform=d>0?"scale(1.06)":"scale(1)";},9000);});})();
// Tilt
(()=>{const items=document.querySelectorAll("[data-tilt]");items.forEach(card=>{const r=()=>card.getBoundingClientRect();card.addEventListener("mousemove",e=>{const b=r();const x=(e.clientX-b.left)/b.width-.5;const y=(e.clientY-b.top)/b.height-.5;card.style.transform=`perspective(800px) rotateX(${(-y*6)}deg) rotateY(${x*6}deg)`;});card.addEventListener("mouseleave",()=>{card.style.transform="perspective(800px) rotateX(0) rotateY(0)";});});})();
// Mobile menu
(()=>{const btn=document.getElementById("menuBtn");const m=document.getElementById("mobileMenu");if(!btn||!m)return;btn.addEventListener("click",()=>m.classList.toggle("hidden"));})();