/* Rook Facility Services — Scripts */


// Mobile nav toggle
function toggleMobileNav(btn) {
  const nav = document.getElementById('mobile-nav');
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
  btn.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const btn = document.querySelector('.nav-hamburger');
  nav.classList.remove('open');
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
// Close mobile nav on resize to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 1100) closeMobileNav();
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings within the same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// Testimonial rotator
(function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.t-dot');
  if (!slides.length) return;

  let idx = 0;
  let timer;

  function show(next) {
    slides[idx].classList.remove('active');
    dots[idx]?.classList.remove('active');
    idx = next;
    slides[idx].classList.add('active');
    dots[idx]?.classList.add('active');
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => show((idx + 1) % slides.length), 20000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      show(i);
      startTimer();
    });
  });

  startTimer();
})();

// Form submit
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  btn.textContent = 'Request Sent — We\'ll Be in Touch!';
  btn.style.background = '#006E3C';
  btn.style.color = '#fff';
  btn.disabled = true;
}
