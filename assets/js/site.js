/**
 * Pure Balance Holistic Veterinary Services
 * Site JavaScript v3.0
 */
(function() {
  'use strict';

  const SITE = {
    CONTACT_EMAIL: "purebalancevet@gmail.com",
    RECORDS_EMAIL: "purebalancevet@gmail.com",
    CLINIC_ADDRESS_LINE: "3240 E Union Hills Dr. Suite 133, Phoenix, AZ 85050",
    HOURS_OR_BY_APPOINTMENT: "By appointment only",
    PRICE_INITIAL_VISIT: "$250",
    PRICE_FOLLOWUP_VISIT: "$175",
    DURATION_INITIAL_VISIT: "60–90 minutes",
    DURATION_FOLLOWUP_VISIT: "30 minutes",
    PACKAGES_YES_NO: "Herbals $50–$100/bottle (other therapies may be recommended; estimate available)",
    INSURANCE_POLICY: "We do not bill insurance directly, but we can provide an invoice you can submit for reimbursement.",
    PAYMENT_POLICY: "Payment is due at the time of service.",
    PAYMENT_TYPES: "Card, cash",
    CANCELLATION_POLICY: "Please provide at least 24 hours notice to reschedule whenever possible.",
    SCHEDULING_LINK: "mailto:purebalancevet@gmail.com?subject=Appointment%20Request%20(Pure%20Balance%20Holistic%20Veterinary%20Services)",
    REVIEWS_LINK: "#",
    SESSION_LENGTH_ACU: "Typically included in visit",
    SESSION_LENGTH_SPINAL: "Typically included in visit",
    SESSION_LENGTH_LASER: "Typically included in visit",
    SESSION_LENGTH_HERBS: "Discussed within visit",
    SESSION_LENGTH_FOOD: "Discussed within visit",
    CADENCE_START_ACU: "Typically 3 initial treatments every 1–2 weeks",
    CADENCE_RECHECK_ACU: "Based on response and condition",
    CADENCE_MAINTENANCE_ACU: "Anywhere from twice a month to twice a year",
    CADENCE_START_SPINAL: "Typically 3 initial treatments every 1–2 weeks",
    CADENCE_RECHECK_SPINAL: "Based on response and condition",
    CADENCE_MAINTENANCE_SPINAL: "Anywhere from twice a month to twice a year",
    CADENCE_START_LASER: "Typically 3 initial treatments every 1–2 weeks",
    CADENCE_RECHECK_LASER: "Based on response and condition",
    CADENCE_MAINTENANCE_LASER: "Anywhere from twice a month to twice a year",
    CADENCE_START_HERBS: "Determined per case after TCVM evaluation",
    CADENCE_RECHECK_HERBS: "Adjustments as needed during follow-ups",
    CADENCE_MAINTENANCE_HERBS: "Long-term support when appropriate",
    CADENCE_START_FOOD: "Step-by-step changes based on goals and sensitivities",
    CADENCE_RECHECK_FOOD: "Refine based on progress",
    CADENCE_MAINTENANCE_FOOD: "As needed",
    CURRENT_YEAR: String(new Date().getFullYear())
  };

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function fillPlaceholders() {
    document.querySelectorAll('[data-field]').forEach(el => {
      const key = el.getAttribute('data-field');
      if (SITE[key] !== undefined) el.textContent = SITE[key];
    });
    document.querySelectorAll('[data-href]').forEach(el => {
      const key = el.getAttribute('data-href');
      if (SITE[key] !== undefined) el.setAttribute('href', SITE[key]);
    });
    document.querySelectorAll('[data-mailto]').forEach(el => {
      const email = SITE.CONTACT_EMAIL || '';
      el.setAttribute('href', email ? `mailto:${email}` : '#');
    });
    document.querySelectorAll('[data-records]').forEach(el => {
      const email = SITE.RECORDS_EMAIL || SITE.CONTACT_EMAIL || '';
      el.setAttribute('href', email ? `mailto:${email}` : '#');
    });
    document.querySelectorAll('[data-map]').forEach(el => {
      const addr = SITE.CLINIC_ADDRESS_LINE || '';
      const query = encodeURIComponent(addr);
      el.setAttribute('href', addr ? `https://www.google.com/maps?q=${query}` : '#');
    });
  }

  function setActiveNav() {
    const path = (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    document.querySelectorAll('a[data-nav]').forEach(link => {
      const href = (link.getAttribute('href') || '').replace(/\/+$/, '');
      if (href && href === path) link.setAttribute('aria-current', 'page');
    });
  }

  function trapFocus(container, onClose) {
    function getFocusable() {
      return Array.from(container.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
    }
    function handleKey(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    container.addEventListener('keydown', handleKey);
    return () => container.removeEventListener('keydown', handleKey);
  }

  function setupMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('primary-nav');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!toggle || !nav) return;
    let cleanup = null;

    function close() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      const lab = toggle.querySelector('.nav-label');
      if (lab) lab.textContent = 'Menu';
      document.documentElement.classList.remove('nav-open');
      document.body.style.overflow = '';
      if (cleanup) { cleanup(); cleanup = null; }
    }

    function open() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      const lab = toggle.querySelector('.nav-label');
      if (lab) lab.textContent = 'Close';
      document.documentElement.classList.add('nav-open');
      document.body.style.overflow = 'hidden';
      const firstLink = nav.querySelector('a');
      if (firstLink) requestAnimationFrame(() => firstLink.focus());
      cleanup = trapFocus(nav, close);
    }

    toggle.setAttribute('aria-label', 'Open menu');
    toggle.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('click', e => {
      if (!nav.classList.contains('open')) return;
      const wrap = nav.closest('.nav-wrap');
      if (wrap && !wrap.contains(e.target)) close();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); }
    });
  }

  function setupScrollReveal() {
    if (prefersReducedMotion()) return;
    const items = document.querySelectorAll('.section, .card, .hero, .smart-card');
    if (!items.length) return;
    items.forEach(el => el.setAttribute('data-reveal', ''));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => obs.observe(el));
  }

  function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    let ticking = false;
    function update() {
      header.style.boxShadow = window.pageYOffset > 100 ? '0 4px 20px rgba(42,36,31,.08)' : '';
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
  }

  function setupLazyLoading() {
    document.querySelectorAll('img:not([loading])').forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) img.setAttribute('loading', 'lazy');
    });
  }

  function setupExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      try {
        const url = new URL(link.href);
        if (url.hostname !== window.location.hostname) {
          if (!link.hasAttribute('target')) link.setAttribute('target', '_blank');
          if (!link.hasAttribute('rel')) link.setAttribute('rel', 'noopener noreferrer');
        }
      } catch(e) {}
    });
  }

  function init() {
    fillPlaceholders();
    setActiveNav();
    setupMobileNav();
    setupScrollReveal();
    setupHeaderScroll();
    setupLazyLoading();
    setupExternalLinks();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.SITE = SITE;
})();
