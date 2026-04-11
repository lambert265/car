// carCard — shared card renderer used by inventory.html and index.html
function carCard(car) {
  const price = typeof convertPrice === 'function' ? convertPrice(car.price) : '$' + car.price.toLocaleString();
  const badge = car.badge ? `<span class="car-badge">${car.badge}</span>` : '';
  const avail = car.available ? '' : '<span class="car-badge sold">Sold</span>';
  const inCart = cart.some(c => c.id === car.id);
  const addBtn = car.available ? `
    <button class="add-cart-btn ${inCart ? 'in-cart' : ''}" onclick="event.preventDefault();addToCart(${car.id})">
      ${inCart ? '✓ Added' : '+ Cart'}
    </button>` : '';
  return `
  <a href="detail.html?id=${car.id}" class="car-card">
    <div class="car-img-wrap">
      <img src="${car.images[0]}" alt="${car.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80'">
      ${badge}${avail}
    </div>
    <div class="car-body">
      <div class="car-meta">
        <span class="car-brand">${car.brand}</span>
        <span class="car-year">${car.year}</span>
      </div>
      <h3 class="car-name">${car.name}</h3>
      <div class="car-specs">
        <span>${car.specs.power}</span>
        <span>${car.mileage.toLocaleString()} mi</span>
        <span>${car.fuel}</span>
      </div>
      <div class="car-footer">
        <div class="car-price">${price}</div>
        <div style="display:flex;align-items:center;gap:8px;">
          ${addBtn}
          <span class="car-cta">View →</span>
        </div>
      </div>
    </div>
  </a>`;
}

// ── CART STATE ──────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('luxe_cart') || '[]');

function saveCart() { localStorage.setItem('luxe_cart', JSON.stringify(cart)); }

function addToCart(id) {
  const car = CARS.find(c => c.id === id);
  if (!car || cart.some(c => c.id === id)) return;
  cart.push(car);
  saveCart();
  updateCartBadge();
  if (typeof applyFilters === 'function') applyFilters();
  showToast(`${car.brand} ${car.name.split(' ').slice(-1)[0]} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  saveCart();
  updateCartBadge();
  renderCartDrawer();
  if (typeof applyFilters === 'function') applyFilters();
}

function updateCartBadge() {
  document.querySelectorAll('.cart-badge').forEach(el => {
    el.textContent = cart.length;
    el.style.display = cart.length > 0 ? 'flex' : 'none';
  });
}

function renderCartDrawer() {
  const list = document.getElementById('cartList');
  const total = document.getElementById('cartTotal');
  if (!list) return;
  if (cart.length === 0) {
    list.innerHTML = '<p style="color:rgba(255,255,255,0.3);text-align:center;padding:40px 0;font-size:13px;">Your cart is empty</p>';
    if (total) total.textContent = '';
    return;
  }
  const fmt = p => typeof convertPrice === 'function' ? convertPrice(p) : '$' + p.toLocaleString();
  list.innerHTML = cart.map(car => `
    <div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);align-items:center;">
      <img src="${car.images[0]}" style="width:72px;height:50px;object-fit:cover;border-radius:4px;flex-shrink:0;" onerror="this.src='https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=60'">
      <div style="flex:1;min-width:0;">
        <p style="font-size:10px;letter-spacing:2px;color:#C9A84C;text-transform:uppercase;">${car.brand}</p>
        <p style="font-size:13px;color:rgba(255,255,255,0.8);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${car.name}</p>
        <p style="font-size:13px;color:#C9A84C;font-weight:600;">${fmt(car.price)}</p>
      </div>
      <button onclick="removeFromCart(${car.id})" style="background:none;border:none;color:rgba(255,255,255,0.25);cursor:pointer;font-size:16px;padding:4px;flex-shrink:0;" title="Remove">✕</button>
    </div>
  `).join('');
  const sum = cart.reduce((s, c) => s + c.price, 0);
  if (total) total.textContent = fmt(sum);
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (!drawer) return;
  const open = drawer.classList.toggle('open');
  overlay.classList.toggle('open', open);
  if (open) renderCartDrawer();
}

function openCheckout() {
  if (cart.length === 0) return;
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    renderCheckoutSummary();
    modal.classList.add('open');
  }
}

function renderCheckoutSummary() {
  const el = document.getElementById('checkoutItems');
  if (!el) return;
  const fmt = p => typeof convertPrice === 'function' ? convertPrice(p) : '$' + p.toLocaleString();
  el.innerHTML = cart.map(car => `
    <div style="display:flex;justify-content:space-between;font-size:12px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
      <span style="color:rgba(255,255,255,0.6);">${car.year} ${car.name}</span>
      <span style="color:#C9A84C;font-weight:600;">${fmt(car.price)}</span>
    </div>
  `).join('');
  const sum = cart.reduce((s, c) => s + c.price, 0);
  document.getElementById('checkoutTotal').textContent = fmt(sum);
}

async function submitEnquiry(e) {
  e.preventDefault();
  const btn = document.getElementById('enquiryBtn');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  const name  = document.getElementById('enqName').value;
  const email = document.getElementById('enqEmail').value;
  const phone = document.getElementById('enqPhone').value;
  const msg   = document.getElementById('enqMsg').value;
  const carList = cart.map(c => `${c.year} ${c.name}`).join(', ');
  // Submit to Supabase via fetch
  try {
    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message: msg, car_name: carList, subject: 'Cart Enquiry' })
    });
  } catch(_) {}
  cart = [];
  saveCart();
  updateCartBadge();
  document.getElementById('checkoutModal').classList.remove('open');
  showToast('Enquiry sent! We will contact you within 24 hours.', 4000);
  btn.textContent = 'Send Enquiry';
  btn.disabled = false;
}

function showToast(msg, duration = 3000) {
  let t = document.getElementById('luxeToast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'luxeToast';
    t.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(80px);background:#141414;border:1px solid rgba(201,168,76,0.4);color:#fff;padding:12px 24px;border-radius:6px;font-size:13px;z-index:9999;transition:transform 0.3s;white-space:nowrap;';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateX(-50%) translateY(0)';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.transform = 'translateX(-50%) translateY(80px)'; }, duration);
}

// Init badge on load
document.addEventListener('DOMContentLoaded', updateCartBadge);

// Custom cursor
document.addEventListener('mousemove', e => {
  document.body.style.setProperty('--cx', e.clientX + 'px');
  document.body.style.setProperty('--cy', e.clientY + 'px');
});

// Nav scroll behavior
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// Trigger hero reveals immediately
document.querySelectorAll('#hero .reveal').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), 300 + i * 200);
});

// Smooth parallax on hero video
const video = document.querySelector('.video-wrap');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (video && y < window.innerHeight) {
    video.style.transform = `translateY(${y * 0.3}px)`;
  }
});
