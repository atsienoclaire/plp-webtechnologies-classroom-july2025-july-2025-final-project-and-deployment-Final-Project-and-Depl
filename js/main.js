// main.js — handles nav toggle, form validation, gallery filter, small animations

document.addEventListener('DOMContentLoaded', function () {
  // Update years
  for (let i = 1; i <= 5; i++) {
    const el = document.getElementById(`year${i === 1 ? '' : '-' + i}`);
    // backward-compatible: older HTML uses id="year" or id="year-2"... We set fallback.
  }
  // fallback selectors
  const yearEls = document.querySelectorAll('[id^="year"]');
  const thisYear = new Date().getFullYear();
  yearEls.forEach(e => e.textContent = thisYear);

  // NAV TOGGLE
  const navToggle = document.getElementById('nav-toggle');
  const siteNavs = document.querySelectorAll('.site-nav');
  navToggle && navToggle.addEventListener('click', () => {
    siteNavs.forEach(nav => nav.classList.toggle('open'));
  });

  // Close menu on link click (mobile)
  document.querySelectorAll('.site-nav a').forEach(a => {
    a.addEventListener('click', () => {
      siteNavs.forEach(nav => nav.classList.remove('open'));
    });
  });

  // CONTACT FORM VALIDATION
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      clearErrors();
      let valid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name.value || name.value.trim().length < 2) {
        showError('error-name', 'Please enter your name (min 2 characters).');
        valid = false;
      }
      if (!email.value || !isValidEmail(email.value)) {
        showError('error-email', 'Please enter a valid email address.');
        valid = false;
      }
      if (!message.value || message.value.trim().length < 10) {
        showError('error-message', 'Message should be at least 10 characters.');
        valid = false;
      }

      if (valid) {
        // For demo: show success and reset (in production, send via fetch to an API)
        document.getElementById('form-success').textContent = 'Message sent! Thank you — we will reply soon.';
        form.reset();
      }
    });
  }

  function showError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }
  function clearErrors() {
    document.querySelectorAll('.error').forEach(e => e.textContent = '');
    const success = document.getElementById('form-success');
    if (success) success.textContent = '';
  }
  function isValidEmail(email) {
    // basic regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // GALLERY FILTER
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.style.display = '';
          item.classList.add('fade-in');
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // simple reveal on scroll for elements with class .fade-in
  const revealElems = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = 'running';
        entry.target.classList.remove('fade-in'); // only animate once
      }
    });
  }, { threshold: 0.15 });
  revealElems.forEach(el => observer.observe(el));
});
