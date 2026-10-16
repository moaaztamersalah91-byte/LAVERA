/* LAVÉRA Theme Studio — visual only. Persists choice in localStorage. */
(()=>{
const d=document,root=d.documentElement;
const THEMES=[
['bloom','زهرة','Bloom','#fff7f3','#ff4f7b','#ff9a6c','#2a1a2e'],
['noir','نوار ذهبي','Noir Gold','#0c0a08','#d4ac62','#f3dfae','#f2ebdf'],
['mint','نعناع','Mint','#f3fcf8','#12b886','#4dd7c8','#0f2e26'],
['lavender','لافندر','Lavender','#faf7ff','#8b5cf6','#d946ef','#241a3d'],
['sunset','غروب','Sunset','#fff8ee','#ff6a3d','#ffc233','#3a1f10'],
['ocean','محيط','Ocean','#f2f8ff','#0a84ff','#00d4c8','#0b2240'],
['mono','مينيمال','Mono','#fafafa','#111111','#888888','#0a0a0a'],
['editorial','مجلة','Editorial','#f7f1e8','#8c5a3c','#c08a5c','#2b211a'],
['cyber','نيون','Cyber','#07070f','#ff2bd6','#00e5ff','#eef0ff'],
['velvet','مخمل','Velvet','#14070c','#e8a0b0','#f6cfa0','#fbeaee']];

const PREMIUM=[
['pearl','لؤلؤ','Pearl','#fbf8f2','#b89b72','#e8d9bd','#29241d'],
['sapphire','ياقوت أزرق','Sapphire','#071a33','#4c8dff','#83e5ff','#eff6ff'],
['emerald','زمرد','Emerald','#071f19','#24b47e','#a4f4c5','#effff7'],
['rose-gold','روز جولد','Rose Gold','#2a1718','#d99a91','#f2d0b1','#fff3ed'],
['ivory','عاجي','Ivory','#fffdf6','#9b8058','#d8c6a0','#29251e'],
['obsidian','أوبسيديان','Obsidian','#111318','#aeb8c7','#f0f4fa','#f0f4fa'],
['sakura','ساكورا','Sakura','#fff5f8','#e77ca7','#f6c5d8','#492337'],
['cobalt','كوبالت','Cobalt','#101b50','#5478ff','#a7b7ff','#f4f6ff'],
['terracotta','تيراكوتا','Terracotta','#fbf0e8','#bd6548','#e9a47c','#392219'],
['champagne','شامبانيا','Champagne','#f8f0df','#c4a15a','#f3dfae','#342919']];
const NEON=[
['neon-pulse','نبض نيون','Neon Pulse','#090b18','#00f5d4','#f15bb5','#f5fbff'],
['ultraviolet','فوق بنفسجي','Ultraviolet','#10051f','#9b5cff','#e15bff','#f9efff'],
['matrix','ماتريكس','Matrix','#03140b','#39ff78','#a2ffb8','#eaffef'],
['hologram','هولوجرام','Hologram','#071521','#54d8ff','#c18aff','#effcff'],
['plasma','بلازما','Plasma','#18081c','#ff3cac','#784bff','#fff0fc'],
['arctic','قطبي','Arctic','#071923','#45e6ff','#b2fbff','#f2feff'],
['toxic','سام','Toxic','#11160a','#c6ff00','#57ff8b','#f7ffe8'],
['synthwave','سينث ويف','Synthwave','#1b0738','#ff4ecd','#ff9e3d','#fff2ff'],
['quantum','كوانتم','Quantum','#080d26','#5c7cfa','#4deeea','#f2f5ff'],
['dark-matter','المادة المظلمة','Dark Matter','#07070a','#8d99ae','#ef233c','#f8f9fa']];
const ALL_THEMES=[...THEMES,...PREMIUM,...NEON];
const categoryOf=id=>PREMIUM.some(t=>t[0]===id)?'premium':NEON.some(t=>t[0]===id)?'neon':'playful';

const SIZES=[['S',.88],['M',1],['L',1.12]];
const get=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const set=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
// extra fonts
const l=d.createElement('link');l.rel='stylesheet';
l.href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Cormorant+Garamond:wght@400;500;600&family=DM+Serif+Display&family=Fraunces:wght@500;600;700&family=Jost:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&family=Playfair+Display:wght@500;700&family=Space+Grotesk:wght@500;700&family=Amiri:wght@400;700&display=swap';
d.head.appendChild(l);
const ar=()=>(root.lang||'ar').startsWith('ar');
let cur=get('lv-style')||'bloom',ts=parseFloat(get('lv-ts')||'1');
if(!ALL_THEMES.some(t=>t[0]===cur))cur='bloom';
const apply=(id,flash)=>{
  if(flash){root.classList.add('ts-sw');const f=d.createElement('div');f.className='ts-flash';d.body.appendChild(f);setTimeout(()=>{f.remove();root.classList.remove('ts-sw')},750)}
  cur=id;root.dataset.style=id;set('lv-style',id);
  d.querySelectorAll('.ts-card').forEach(c=>c.classList.toggle('on',c.dataset.id===id));
};
const applyTs=v=>{ts=v;root.style.setProperty('--ts',v);set('lv-ts',v);d.querySelectorAll('.ts-seg button').forEach(b=>b.classList.toggle('on',parseFloat(b.dataset.v)===v))};
root.dataset.style=cur;root.style.setProperty('--ts',ts);
const build=()=>{
  const A=ar();
  const tab=d.createElement('button');tab.className='ts-tab';tab.setAttribute('aria-label','Theme Studio');
  tab.innerHTML='<i>🎨</i><span>'+(A?'ستوديو التصميم':'Theme Studio')+'</span>';
  const p=d.createElement('aside');p.className='ts-panel';
  p.innerHTML='<div class="ts-head"><div><b>Theme Studio</b><small>'+(A?'اختاري ستايل الموقع — يتحفظ تلقائيًا':'Pick your style — saved automatically')+'</small></div><button class="ts-x" aria-label="close">✕</button></div>'
  +'<div class="ts-categories" role="tablist" aria-label="Theme categories">'
  +'<button class="ts-category on" data-category="playful" role="tab">'+(A?'Playful':'Playful')+' <span>10</span></button>'
  +'<button class="ts-category" data-category="premium" role="tab">Premium <span>10</span></button>'
  +'<button class="ts-category" data-category="neon" role="tab">Neonverse <span>10</span></button>'
  +'</div><div class="ts-grid">'+ALL_THEMES.map(t=>'<button class="ts-card" data-id="'+t[0]+'" data-category="'+categoryOf(t[0])+'"><div class="ts-pv" style="background:'+t[3]+'"><u style="background:'+t[6]+'"></u><i class="p1" style="background:linear-gradient(135deg,'+t[4]+','+t[5]+')"></i><i class="p2" style="background:'+t[4]+'"></i></div>'+(A?t[1]:t[2])+'</button>').join('')+'</div>'
  +'<div class="ts-row"><span>'+(A?'حجم الخط':'Text size')+'</span><div class="ts-seg">'+SIZES.map(s=>'<button data-v="'+s[1]+'">'+s[0]+'</button>').join('')+'</div></div>'
  +'<div class="ts-actions"><button class="go" id="tsRnd">'+(A?'🎲 فاجئني':'🎲 Surprise me')+'</button><button id="tsReset">'+(A?'إعادة ضبط':'Reset')+'</button></div>';
  d.body.append(tab,p);
  const open=v=>p.classList.toggle('open',v);
  let dragged=false,dragging=false,startX=0,startY=0,baseX=0,baseY=0;
  tab.style.touchAction='none';
  tab.addEventListener('pointerdown',e=>{
    if(e.button!==undefined&&e.button!==0)return;
    dragging=true;dragged=false;startX=e.clientX;startY=e.clientY;
    const r=tab.getBoundingClientRect();baseX=r.left;baseY=r.top;
    tab.setPointerCapture?.(e.pointerId);
  });
  tab.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const dx=e.clientX-startX,dy=e.clientY-startY;
    if(Math.abs(dx)+Math.abs(dy)>5)dragged=true;
    if(!dragged)return;
    const x=Math.max(0,Math.min(innerWidth-tab.offsetWidth,baseX+dx));
    const y=Math.max(0,Math.min(innerHeight-tab.offsetHeight,baseY+dy));
    tab.style.insetInlineStart='auto';tab.style.left=x+'px';tab.style.right='auto';
    tab.style.top=y+'px';tab.style.bottom='auto';
  });
  tab.addEventListener('pointerup',()=>{dragging=false;if(dragged){tab.dataset.justDragged='1';setTimeout(()=>delete tab.dataset.justDragged,0)}});
  tab.addEventListener('pointercancel',()=>{dragging=false});
  tab.onclick=()=>{if(tab.dataset.justDragged)return;open(!p.classList.contains('open'))};
  p.querySelector('.ts-x').onclick=()=>open(false);
  d.addEventListener('keydown',e=>{if(e.key==='Escape')open(false)});
  const showCategory=cat=>{
    p.querySelectorAll('.ts-category').forEach(b=>{const active=b.dataset.category===cat;b.classList.toggle('on',active);b.setAttribute('aria-selected',String(active))});
    p.querySelectorAll('.ts-card').forEach(c=>{c.hidden=c.dataset.category!==cat});
  };
  p.querySelectorAll('.ts-category').forEach(b=>b.onclick=()=>showCategory(b.dataset.category));
  p.querySelectorAll('.ts-card').forEach(c=>c.onclick=()=>apply(c.dataset.id,true));
  showCategory(categoryOf(cur));
  p.querySelectorAll('.ts-seg button').forEach(b=>b.onclick=()=>applyTs(parseFloat(b.dataset.v)));
  p.querySelector('#tsRnd').onclick=()=>{let n;do{n=ALL_THEMES[Math.floor(Math.random()*ALL_THEMES.length)][0]}while(n===cur);apply(n,true)};
  p.querySelector('#tsReset').onclick=()=>{apply('bloom',true);applyTs(1)};
  apply(cur,false);applyTs(ts);
};
d.readyState==='loading'?d.addEventListener('DOMContentLoaded',build):build();
})();
