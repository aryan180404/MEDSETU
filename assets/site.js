// MEDSETU — shared behaviour: header, mobile menu, reveal on scroll, FAQ search.
(function () {
  var header = document.querySelector('.site-header');
  var onScroll = function () { if (header) header.classList.toggle('is-scrolled', window.scrollY > 12); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); }
    });
  }

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el, i) { el.style.transitionDelay = (el.dataset.delay || 0) + 'ms'; io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // FAQ: search, category filter, expand/collapse, deep links
  var list = document.getElementById('faq-list');
  if (!list) return;
  var input = document.getElementById('faq-search');
  var search = input.closest('.search');
  var clear = search.querySelector('.clear');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-cat]'));
  var faqs = Array.prototype.slice.call(list.querySelectorAll('.faq'));
  var groups = Array.prototype.slice.call(list.querySelectorAll('.faq-group'));
  var count = document.getElementById('faq-count');
  var empty = document.getElementById('faq-empty');
  var toggleAll = document.getElementById('faq-toggle');
  var category = 'all';

  faqs.forEach(function (f) {
    var q = f.querySelector('.q');
    var a = f.querySelector('.answer');
    q.dataset.raw = q.innerHTML;
    a.dataset.raw = a.innerHTML;
    f.dataset.text = (q.textContent + ' ' + a.textContent).toLowerCase();
  });

  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  function highlight(html, term) {
    if (!term) return html;
    var re = new RegExp('(' + escapeRe(term) + ')', 'gi');
    // Only touch text between tags.
    return html.replace(/(^|>)([^<]+)/g, function (m, p, text) { return p + text.replace(re, '<mark>$1</mark>'); });
  }

  function apply() {
    var term = input.value.trim().toLowerCase();
    search.classList.toggle('has-value', term.length > 0);
    var shown = 0;
    faqs.forEach(function (f) {
      var okCat = category === 'all' || f.dataset.cat === category;
      var okTerm = !term || f.dataset.text.indexOf(term) !== -1;
      var show = okCat && okTerm;
      f.hidden = !show;
      f.querySelector('.q').innerHTML = highlight(f.querySelector('.q').dataset.raw, term);
      f.querySelector('.answer').innerHTML = highlight(f.querySelector('.answer').dataset.raw, term);
      if (show) { shown++; if (term) f.open = true; }
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('.faq:not([hidden])'); });
    count.textContent = shown + ' of ' + faqs.length + ' questions';
    empty.classList.toggle('show', shown === 0);
    if (empty.querySelector('.term')) empty.querySelector('.term').textContent = input.value.trim();
  }

  input.addEventListener('input', apply);
  clear.addEventListener('click', function () { input.value = ''; faqs.forEach(function (f) { f.open = false; }); apply(); input.focus(); });
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      category = c.dataset.cat;
      chips.forEach(function (o) { o.setAttribute('aria-pressed', o === c ? 'true' : 'false'); });
      apply();
    });
  });
  toggleAll.addEventListener('click', function () {
    var visible = faqs.filter(function (f) { return !f.hidden; });
    var anyClosed = visible.some(function (f) { return !f.open; });
    visible.forEach(function (f) { f.open = anyClosed; });
    toggleAll.textContent = anyClosed ? 'Collapse all' : 'Expand all';
  });

  // Open the question named in the URL hash.
  function openHash() {
    var t = location.hash && document.getElementById(location.hash.slice(1));
    if (t && t.classList.contains('faq')) { t.open = true; }
  }
  window.addEventListener('hashchange', openHash);
  openHash();
  apply();
})();
