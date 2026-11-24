const SITE_CONFIG={phone:'0000000000',zaloUrl:'',messengerUrl:''};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const money=n=>new Intl.NumberFormat('vi-VN').format(n)+'₫';
let cart=JSON.parse(localStorage.getItem('hta-cart')||'{}');

function placeholder(label){return `<div class="image-placeholder"><span>DECAL PHỐ</span><small>${label}</small></div>`}
function productImage(p){return `<img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.outerHTML='${placeholder('THÊM ẢNH SẢN PHẨM').replace(/'/g,"\\'")}'">`}

function renderProducts(filter='all',term=''){
 const list=PRODUCTS.filter(p=>(filter==='all'||p.category===filter)&&(`${p.name} ${p.desc}`.toLowerCase().includes(term.toLowerCase())));
 $('#productGrid').innerHTML=list.length?list.map(p=>`<article class="product-card"><div class="product-photo">${productImage(p)}${p.tag?`<span class="product-tag">${p.tag}</span>`:''}<button class="quick-add" data-add="${p.id}" aria-label="Thêm ${p.name}">+</button></div><div class="product-info"><small>${p.category==='led'?'ĐÈN LED':p.category==='decal'?'DÁN DECAL':'PHỤ KIỆN'}</small><h3>${p.name}</h3><p>${p.desc}</p><div class="price">${money(p.price)} ${p.oldPrice?`<del>${money(p.oldPrice)}</del>`:''}</div><button class="add-btn" data-add="${p.id}">THÊM VÀO GIỎ <span>＋</span></button></div></article>`).join(''):'<p class="empty-state">Không tìm thấy sản phẩm phù hợp.</p>';
 $$('[data-add]').forEach(b=>b.addEventListener('click',()=>addToCart(+b.dataset.add)));
}

function saveCart(){localStorage.setItem('hta-cart',JSON.stringify(cart));renderCart()}
function addToCart(id){cart[id]=(cart[id]||0)+1;saveCart();openCart();}
function changeQty(id,delta){cart[id]=(cart[id]||0)+delta;if(cart[id]<=0)delete cart[id];saveCart()}

function renderCart(){
 let entries=Object.entries(cart).map(([id,qty])=>({p:PRODUCTS.find(p=>p.id===+id),qty})).filter(x=>x.p);
 let count=entries.reduce((s,x)=>s+x.qty,0),sum=entries.reduce((s,x)=>s+x.p.price*x.qty,0);
 $$('.cart-count').forEach(e=>e.textContent=count);
 $('#cartTotalCount').textContent=count;
 $('#cartSubtotal').textContent=money(sum);
 $('#cartItems').innerHTML=entries.length?entries.map(({p,qty})=>`<div class="cart-item"><div class="cart-thumb">${productImage(p)}</div><div class="cart-detail"><b>${p.name}</b><strong>${money(p.price)}</strong><div class="qty"><button data-qty="${p.id}" data-delta="-1">−</button><span>${qty}</span><button data-qty="${p.id}" data-delta="1">+</button><button class="remove" data-remove="${p.id}">Xóa</button></div></div></div>`).join(''):'<div class="empty-cart"><span>🛒</span><h3>Giỏ hàng đang trống</h3><p>Hãy chọn sản phẩm bạn quan tâm.</p></div>';
 $$('[data-qty]').forEach(b=>b.onclick=()=>changeQty(+b.dataset.qty,+b.dataset.delta));
 $$('[data-remove]').forEach(b=>b.onclick=()=>{delete cart[b.dataset.remove];saveCart()});
}

function openCart(){$('#overlay').classList.add('show');$('#cartDrawer').classList.add('open')}
function closeLayers(){$('#overlay').classList.remove('show');$('#cartDrawer').classList.remove('open');$$('.modal').forEach(m=>m.classList.remove('show'));closeMobileMenu()}

$('#headerCart').onclick=$('#bottomCart').onclick=openCart;
$('#cartClose').onclick=closeLayers;
$('#overlay').onclick=closeLayers;

// Menu mobile: mở / đóng độc lập với giỏ hàng và modal
const menuNode=$('#mainNav'), menuBackdrop=$('#menuBackdrop'), menuToggle=$('#menuBtn');
function openMobileMenu(){
  menuNode.classList.add('nav-open');menuBackdrop.classList.add('show');
  document.body.classList.add('menu-is-open');menuNode.setAttribute('aria-hidden','false');
  menuToggle.setAttribute('aria-expanded','true');
}
function closeMobileMenu(){
  menuNode.classList.remove('nav-open');menuBackdrop.classList.remove('show');
  document.body.classList.remove('menu-is-open');menuNode.setAttribute('aria-hidden','true');
  menuToggle.setAttribute('aria-expanded','false');
}
menuToggle.setAttribute('aria-expanded','false');
menuToggle.onclick=()=>menuNode.classList.contains('nav-open')?closeMobileMenu():openMobileMenu();
$('#menuCloseBtn').onclick=closeMobileMenu;
$('.cat-close').onclick=closeMobileMenu;
menuBackdrop.onclick=closeMobileMenu;
$$('#mainNav a').forEach(a=>a.addEventListener('click',closeMobileMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMobileMenu()});
window.addEventListener('resize',()=>{if(window.innerWidth>900)closeMobileMenu()});

function openSearch(){$('#searchPanel').classList.add('show');$('#searchInput').focus()}
$('#searchBtn').onclick=$('#searchToggle').onclick=openSearch;
$('#searchClose').onclick=()=>$('#searchPanel').classList.remove('show');
$('#searchInput').addEventListener('input',e=>{renderProducts('all',e.target.value);$('#products').scrollIntoView({behavior:'smooth'})});

$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter,$('#searchInput').value)});

const openAcc=()=>$('#accountModal').classList.add('show');
$('#accountBtn').onclick=$('#sidebarAccountBtn').onclick=$('#desktopLoginLink').onclick=openAcc;
$('#sidebarRegisterBtn').onclick=$('#desktopRegisterLink').onclick=openAcc;

$$('[data-close]').forEach(b=>b.onclick=()=>b.closest('.modal').classList.remove('show'));

let slide=0;const slides=$$('.hero-slide'),dots=$$('#slideDots button');
function showSlide(n){slide=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle('active',i===slide));dots.forEach((d,i)=>d.classList.toggle('active',i===slide))}
$('#slidePrev').onclick=()=>showSlide(slide-1);
$('#slideNext').onclick=()=>showSlide(slide+1);
dots.forEach((d,i)=>d.onclick=()=>showSlide(i));
setInterval(()=>showSlide(slide+1),6000);

const galleryFiles=['assets/images/gallery/xe-01.svg','assets/images/gallery/xe-02.svg','assets/images/gallery/xe-03.svg','assets/images/gallery/xe-04.svg'];
$('#galleryGrid').innerHTML=galleryFiles.map((f,i)=>`<div class="gallery-item"><img src="${f}" loading="lazy" alt="Mẫu xe thi công ${i+1}" onerror="this.outerHTML='${placeholder('ẢNH XE THỰC TẾ').replace(/'/g,"\\'")}'"><span>MẪU / 0${i+1}</span></div>`).join('');

$$('.video-tile').forEach(b=>b.onclick=()=>{let v=$('#videoPlayer');v.src=b.dataset.video;$('#videoMessage').textContent='Video đang được cập nhật.';$('#videoModal').classList.add('show');v.play().catch(()=>{})});

$('#checkoutBtn').onclick=()=>{if(!Object.keys(cart).length){alert('Giỏ hàng đang trống.');return}$('#checkoutModal').classList.add('show')};
$('#checkoutForm').onsubmit=e=>{
 e.preventDefault();let d=new FormData(e.target);
 let lines=Object.entries(cart).map(([id,q])=>{let p=PRODUCTS.find(x=>x.id===+id);return p?`- ${p.name} x ${q}: ${money(p.price*q)}`:''}).join('\n');
 let msg=`YÊU CẦU TƯ VẤN / ĐẶT HÀNG\nHọ tên: ${d.get('name')}\nĐiện thoại: ${d.get('phone')}\nGhi chú: ${d.get('note')}\nSản phẩm:\n${lines}\nTổng tạm tính: ${$('#cartSubtotal').textContent}`;
 $('#checkoutResult').textContent='Đã tạo nội dung yêu cầu. Nhấn nút bên dưới để sao chép và gửi cho cửa hàng.';
 let copy=document.createElement('button');copy.className='btn-red full';copy.textContent='SAO CHÉP NỘI DUNG';
 copy.onclick=()=>navigator.clipboard.writeText(msg).then(()=>copy.textContent='ĐÃ SAO CHÉP');
 $('#checkoutResult').appendChild(copy);
};

$('#year').textContent=new Date().getFullYear();
['bottomCall','contactCall'].forEach(id=>$('#'+id).href=SITE_CONFIG.phone==='0000000000'?'#contact':'tel:'+SITE_CONFIG.phone);
$('#bottomMessage').href=SITE_CONFIG.zaloUrl||'#contact';

renderProducts();
renderCart();
$$('[data-vehicle]').forEach(b=>b.addEventListener('click',()=>{ $$('[data-vehicle]').forEach(x=>x.setAttribute('aria-pressed',String(x===b))); $('#vehicleNote').textContent='Dịch vụ gợi ý cho Honda '+b.dataset.vehicle.toUpperCase()+'. Liên hệ để xác nhận đời xe và khả năng lắp đặt.'; $('#vehicleLinks').hidden=false; }));
