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
