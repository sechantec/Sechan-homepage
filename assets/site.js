// 공통 초기화: 연도, 모바일 메뉴, 서브메뉴 아코디언
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

  // 모바일에서 1뎁스 클릭 시 서브메뉴 토글
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
  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;
  const hasMultiple = slides.length > 1;

  function show(index){
    slides.forEach((s,i)=>{
      s.classList.toggle('active', i === index);
      s.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });
  }

  function play(){
    if (!hasMultiple) return; // 슬라이드 1장일 경우 전환 없음
    stop();
    timer = setInterval(()=>{
      currentIndex = (currentIndex + 1) % slides.length;
      show(currentIndex);
    }, 5000);
  }

  function stop(){
    if (timer){ clearInterval(timer); timer = null; }
  }

  // 탭 비활성화되면 일시 정지
  document.addEventListener('visibilitychange', ()=>{
    if (document.hidden) stop(); else play();
  });

  // 초기 표시
  show(currentIndex);
  play();
}

// 헤더/푸터 로드 후 초기화
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

