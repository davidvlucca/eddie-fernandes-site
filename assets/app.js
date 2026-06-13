// ---- Mobile nav (hamburger) ----
document.querySelectorAll('.nav-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var nav = btn.closest('nav');
    var open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
});
// Close the menu after tapping a link
document.querySelectorAll('.nav-links a').forEach(function (a) {
  a.addEventListener('click', function () {
    var nav = a.closest('nav');
    if (nav) nav.classList.remove('open');
  });
});

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(function (item) {
  item.addEventListener('click', function () { item.classList.toggle('open'); });
});

// ---- Donate amount selection (visual only — donations not yet active) ----
document.querySelectorAll('.amt-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.amt-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
  });
});

// ---- Contact form -> opens the visitor's email client, pre-filled ----
var form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = function (n) { return (form.elements[n] && form.elements[n].value || '').trim(); };
    var subject = 'Website request' + (v('type') ? ' — ' + v('type') : '');
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
}

// ---- Scroll reveal (progressive enhancement) ----
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.section, .stats');
  if (reduce || !('IntersectionObserver' in window) || !els.length) return;
  document.body.classList.add('js-reveal');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  els.forEach(function (el) { io.observe(el); });
}());
