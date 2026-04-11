// carCard — shared card renderer used by inventory.html and index.html
function carCard(car) {
  const price = typeof convertPrice === 'function' ? convertPrice(car.price) : '$' + car.price.toLocaleString();
  const badge = car.badge ? `<span class="car-badge">${car.badge}</span>` : '';
  const avail = car.available ? '' : '<span class="car-badge sold">Sold</span>';
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
        <span class="car-cta">View Details →</span>
      </div>
    </div>
  </a>`;
}

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
