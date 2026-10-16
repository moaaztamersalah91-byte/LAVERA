/* LAVÉRA fixed premium polish — lightweight, visual-only */
(()=>{
  const d=document, hdr=d.querySelector('.header');
  if(hdr){
    let ticking=false;
    const update=()=>{hdr.classList.toggle('is-scrolled',window.scrollY>40);ticking=false;};
    window.addEventListener('scroll',()=>{if(!ticking){window.requestAnimationFrame(update);ticking=true;}},{passive:true});
    update();
  }
  if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const selector='.intro>*,.section-title,.cat,.statement>*,.contact-card,.story-grid>*,.cart-item,.page-heading,.product';
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('lv-in');io.unobserve(entry.target);}
  }),{threshold:.08,rootMargin:'0px 0px -3% 0px'});
  d.querySelectorAll(selector).forEach((el,i)=>{el.classList.add('lv-reveal');el.style.setProperty('--d',(i%3)*.04+'s');io.observe(el);});
})();
