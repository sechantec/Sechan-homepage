function initCommon(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const ham = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-nav');
  if (ham && nav){
    ham.addEventListener('click', () => {
      const opened = nav.classList.toggle('open');
      ham.setAttribute('aria-expanded', opened);
    });
  }

  if (window.matchMedia('(max-width:980px)').matches){
    document.querySelectorAll('#primary-nav > ul > li > a').forEach((a)=>{
      a.addEventListener('click', (e)=>{
        const next = a.nextElementSibling;
        if(next && next.classList.contains('submenu')){
          e.preventDefault();
          next.style.display = (next.style.display==='block') ? 'none' : 'block';
        }
      });
    });
  }
}

// (선택) 기존 슬라이드가 있다면 동작하도록 남겨둠
function initSlideshow(){
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;
  let idx = 0, timer = null;
  const hasMultiple = slides.length > 1;

  function show(i){
    slides.forEach((s,k)=>{
      s.classList.toggle('active', k === i);
      s.setAttribute('aria-hidden', k === i ? 'false' : 'true');
    });
  }
  function play(){
    if (!hasMultiple) return;
    stop();
    timer = setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, 5000);
  }
  function stop(){ if(timer){ clearInterval(timer); timer = null; } }

  document.addEventListener('visibilitychange', ()=>{ if(document.hidden) stop(); else play(); });
  show(idx); play();
}

async function mountPartials(){
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if (headerMount){
    const html = await (await fetch('/partials/header.html')).text();
    headerMount.outerHTML = html;
  }
  if (footerMount){
    const html = await (await fetch('/partials/footer.html')).text();
    footerMount.outerHTML = html;
  }
  initCommon();
  initSlideshow();
}

document.addEventListener('DOMContentLoaded', mountPartials);

