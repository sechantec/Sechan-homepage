// 공통 초기화: 연도, 모바일 메뉴, 서브메뉴 아코디언, 슬라이드
function initCommon(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  const ham = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-nav');
  if(ham && nav){
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

function initSlideshow(){
  const slides = document.querySelectorAll('.slide');
  if(!slides.length) return;
  let currentIndex = 0;
  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

// 헤더/푸터 로드 후 초기화
async function mountPartials(){
  const headerMount = document.getElementById('site-header');
  const footerMount = document.getElementById('site-footer');
  if(headerMount){ headerMount.outerHTML = await (await fetch('/partials/header.html')).text(); }
  if(footerMount){ footerMount.outerHTML = await (await fetch('/partials/footer.html')).text(); }
  initCommon();
  initSlideshow();
}

document.addEventListener('DOMContentLoaded', mountPartials);

