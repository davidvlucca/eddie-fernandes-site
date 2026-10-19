// ---- Mobile nav (hamburger) ----
function setNav(nav, open) {
  var btn = nav.querySelector('.nav-toggle');
  nav.classList.toggle('open', open);
  if (!btn) return;
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
document.querySelectorAll('.nav-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var nav = btn.closest('nav');
    setNav(nav, !nav.classList.contains('open'));
  });
});
// Close the menu after tapping a link, pressing Escape, or tapping outside it
document.querySelectorAll('.nav-links a').forEach(function (a) {
  a.addEventListener('click', function () {
    var nav = a.closest('nav');
    if (nav) setNav(nav, false);
  });
});
document.addEventListener('keydown', function (e) {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('nav.open').forEach(function (nav) {
    setNav(nav, false);
    var btn = nav.querySelector('.nav-toggle');
    if (btn) btn.focus();
  });
});
document.addEventListener('click', function (e) {
  document.querySelectorAll('nav.open').forEach(function (nav) {
    if (!nav.contains(e.target)) setNav(nav, false);
  });
});

// ---- FAQ accordion (the question is a <button>) ----
document.querySelectorAll('.faq-q').forEach(function (q) {
  q.addEventListener('click', function () {
    var open = q.closest('.faq-item').classList.toggle('open');
    q.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});

// ---- Donate amount selection (visual only, donations not yet active) ----
document.querySelectorAll('.amt-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.amt-btn').forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
  });
});

// ---- Contact form -> opens the visitor's email client, pre-filled ----
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (form.elements[n] && form.elements[n].value || '').trim(); };
    var subject = 'Website request' + (v('type') ? ': ' + v('type') : '');
    var body =
      'Name: ' + v('name') + '\n' +
      'Email: ' + v('email') + '\n' +
      'Type of request: ' + v('type') + '\n' +
      'Country: ' + v('country') + '\n\n' +
      v('message');
    window.location.href = 'mailto:eddiejfernandes@gmail.com'
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
  });
}());

// ---- Scroll reveal (progressive enhancement) ----
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.section, .stats');
  if (reduce || !('IntersectionObserver' in window) || !els.length) return;
  document.body.classList.add('js-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      // Also reveal anything already scrolled past, so a fast scroll never leaves a section hidden
      if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: '0px 0px -7% 0px' });
  els.forEach(function (el) { io.observe(el); });
  // Show everything when printing
  window.addEventListener('beforeprint', function () {
    els.forEach(function (el) { el.classList.add('in'); io.unobserve(el); });
  });
}());
