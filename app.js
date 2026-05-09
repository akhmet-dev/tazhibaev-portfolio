// ── PARTICLES ──────────────────────────────────────
const canvas=document.getElementById('particles');
const ctx=canvas.getContext('2d');
let W,H,pts=[];
function resize(){W=canvas.width=innerWidth;H=canvas.height=innerHeight}
resize();window.addEventListener('resize',resize);
for(let i=0;i<70;i++)pts.push({
  x:Math.random()*9999,y:Math.random()*9999,
  vx:(Math.random()-.5)*.25,vy:(Math.random()-.5)*.25,
  r:Math.random()*1.4+.4,a:Math.random()*.5+.1
});
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>W)p.vx*=-1;
    if(p.y<0||p.y>H)p.vy*=-1;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(201,168,76,${p.a})`;ctx.fill();
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── AWARDS GRID ────────────────────────────────────
const imgs=[
  "WhatsApp Image 2026-05-08 at 22.41.17.jpeg",
  "WhatsApp Image 2026-05-08 at 22.42.10.jpeg",
  "WhatsApp Image 2026-05-08 at 22.42.43.jpeg",
  "WhatsApp Image 2026-05-08 at 22.43.19.jpeg",
  "WhatsApp Image 2026-05-08 at 22.43.51.jpeg",
  "WhatsApp Image 2026-05-08 at 22.44.48.jpeg",
  "WhatsApp Image 2026-05-08 at 22.48.07.jpeg",
  "WhatsApp Image 2026-05-08 at 22.49.01.jpeg",
  "WhatsApp Image 2026-05-08 at 22.49.34.jpeg",
  "WhatsApp Image 2026-05-08 at 22.50.10.jpeg",
  "WhatsApp Image 2026-05-08 at 22.51.28.jpeg",
  "WhatsApp Image 2026-05-08 at 22.52.16.jpeg",
  "WhatsApp Image 2026-05-08 at 22.53.05.jpeg",
  "WhatsApp Image 2026-05-08 at 22.53.46.jpeg",
  "WhatsApp Image 2026-05-08 at 22.56.17.jpeg",
  "WhatsApp Image 2026-05-08 at 22.57.20.jpeg",
  "WhatsApp Image 2026-05-08 at 22.58.05.jpeg",
  "WhatsApp Image 2026-05-08 at 22.58.42.jpeg",
  "WhatsApp Image 2026-05-08 at 22.59.13.jpeg",
  "WhatsApp Image 2026-05-08 at 23.00.03.jpeg"
];
let ci=0;
const ag=document.getElementById('ag');
imgs.forEach((s,i)=>{
  const d=document.createElement('div');d.className='ac fade-in';
  d.innerHTML=`<img src="images/${encodeURIComponent(s)}" alt="Марапат ${i+1}" loading="lazy"><div class="ac-lbl">Марапат ${i+1}</div>`;
  d.onclick=()=>lbOpen(i);ag.appendChild(d);
});

// ── LIGHTBOX ────────────────────────────────────────
function lbOpen(i){
  ci=i;
  document.getElementById('lb-img').src=`images/${encodeURIComponent(imgs[i])}`;
  document.getElementById('lb-cnt').textContent=`${i+1} / ${imgs.length}`;
  document.getElementById('lb').classList.add('on');
  document.body.style.overflow='hidden';
}
function lbClose(e){if(e.target===document.getElementById('lb'))lbOff()}
function lbOff(){document.getElementById('lb').classList.remove('on');document.body.style.overflow=''}
function lbNav(d){
  ci=(ci+d+imgs.length)%imgs.length;
  document.getElementById('lb-img').src=`images/${encodeURIComponent(imgs[ci])}`;
  document.getElementById('lb-cnt').textContent=`${ci+1} / ${imgs.length}`;
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape')lbOff();
  if(e.key==='ArrowRight')lbNav(1);
  if(e.key==='ArrowLeft')lbNav(-1);
});

// ── SCROLL ANIMATIONS ───────────────────────────────
const fadeObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.15});
document.querySelectorAll('.fade-in').forEach(el=>fadeObs.observe(el));

// ── SKILL BARS ──────────────────────────────────────
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.skill-fill').forEach(b=>{
        setTimeout(()=>{b.style.width=b.dataset.w},200);
      });
    }
  });
},{threshold:.3});
document.querySelectorAll('.skills').forEach(s=>skillObs.observe(s));

// ── TYPING EFFECT ───────────────────────────────────
const typed=document.getElementById('typed');
if(typed){
  const words=['Педагог','Офицер','Ұстаз','Тәрбиеші'];
  let wi=0,ci2=0,del=false;
  function type(){
    const w=words[wi];
    if(!del){
      typed.textContent=w.slice(0,++ci2);
      if(ci2===w.length){del=true;setTimeout(type,1800);return}
    }else{
      typed.textContent=w.slice(0,--ci2);
      if(ci2===0){del=false;wi=(wi+1)%words.length}
    }
    setTimeout(type,del?60:110);
  }
  type();
}

// ── COUNTER ANIMATION ───────────────────────────────
const counterObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.querySelectorAll('.n').forEach(el=>{
      const target=parseInt(el.dataset.n)||0;
      let cur=0,step=Math.ceil(target/40);
      const t=setInterval(()=>{
        cur=Math.min(cur+step,target);
        el.textContent=cur+(el.dataset.suffix||'');
        if(cur>=target)clearInterval(t);
      },40);
    });
    counterObs.unobserve(e.target);
  });
},{threshold:.5});
document.querySelectorAll('.stats').forEach(s=>counterObs.observe(s));
