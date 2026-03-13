/* =============================================================
   M+K Work s.r.o. — Main Script
   Content loader + GSAP animations + UI interactions
   ============================================================= */

'use strict';

// ---- Inline SVG icon map ----
const ICONS = {
  'award':          `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
  'truck':          `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>`,
  'clock':          `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  'shield-check':   `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
  'message-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
  'badge-check':    `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  'phone-call':     `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.41 6.41l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>`,
  'map-pin':        `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  'hard-hat':       `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z"/><path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M4 15v-3a6 6 0 0 1 6-6h0"/><path d="M14 6h0a6 6 0 0 1 6 6v3"/></svg>`,
  'check-circle':   `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`,
  'grid-2x2':       `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="10" height="10" x="3" y="3" rx="2"/><rect width="10" height="10" x="13" y="3" rx="2"/><rect width="10" height="10" x="3" y="13" rx="2"/><rect width="10" height="10" x="13" y="13" rx="2"/></svg>`,
  'shovel':         `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 22v-5l5-5 5 5-5 5z"/><path d="M9.5 14.5 16 8"/><path d="m17 2 5 5-.5.5a3.53 3.53 0 0 1-5 0s0 0 0 0a3.53 3.53 0 0 1 0-5L17 2"/></svg>`,
  'layers':         `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
  'phone':          `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6.41 6.41l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
  'mail':           `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  'location':       `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  'time':           `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
};

function icon(name, color) {
  const svg = ICONS[name] || ICONS['check-circle'];
  if (color) return svg.replace('stroke="currentColor"', `stroke="${color}"`);
  return svg;
}

// ============================================================
// MAIN BOOT
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  fetch('content.json')
    .then(res => res.json())
    .then(data => {
      applyTheme(data.theme);
      applyFonts(data.fonts);

      data.sections
        .slice()
        .sort((a, b) => a.order - b.order)
        .forEach(section => renderSection(section, data));

      // Set WhatsApp link
      if (data.whatsapp) {
        const wa = document.getElementById('whatsapp-btn');
        if (wa) wa.href = `https://wa.me/${data.whatsapp}`;
      }

      initNavbar();
      initMobileMenu();
      initSmoothScroll();
      initScrollTop();
      initContactForm(data);
      initGSAP();
      initLightbox();
      initLenis();
      removeLoader();
    })
    .catch(err => {
      console.error('Failed to load content.json:', err);
      removeLoader();
    });
});

// ============================================================
// THEME & FONTS
// ============================================================
function applyTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme).forEach(([k, v]) => root.style.setProperty(`--${k.replace(/_/g, '-')}`, v));
}
function applyFonts(fonts) {
  if (!fonts) return;
  document.documentElement.style.setProperty('--font-heading', fonts.heading);
  document.documentElement.style.setProperty('--font-body', fonts.body);
}

// ============================================================
// SECTION RENDERERS
// ============================================================
function renderSection(section, data) {
  switch (section.type) {
    case 'navigation':   renderNavigation(section); break;
    case 'hero':         renderHero(section); break;
    case 'about':        renderAbout(section); break;
    case 'services_list': renderServices(section); break;
    case 'gallery':      renderGallery(section); break;
    case 'features':     renderFeatures(section); break;
    case 'process':      renderProcess(section); break;
    case 'contact':      renderContact(section, data); break;
    case 'footer':       renderFooter(section, data); break;
  }
}

// ---- Navigation ----
function renderNavigation(section) {
  const f = section.fields;
  setText('nav-logo-text', f.logo_text);
  setText('nav-logo-sub', f.logo_sub);

  const cta = document.getElementById('nav-cta');
  if (cta) { cta.textContent = f.cta_text; cta.href = f.cta_url || '#'; }

  const desktopUl = document.getElementById('nav-desktop-links');
  const mobileUl  = document.getElementById('nav-mobile-links');
  const mobileCta = document.getElementById('nav-mobile-cta');

  f.links.forEach(link => {
    [desktopUl, mobileUl].forEach(ul => {
      if (!ul) return;
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = link.url; a.textContent = link.label;
      li.appendChild(a); ul.appendChild(li);
    });
  });

  if (mobileCta) { mobileCta.textContent = f.cta_text; mobileCta.href = f.cta_url || '#'; }
}

// ---- Hero ----
function renderHero(section) {
  const f = section.fields;

  // Background
  const img = document.getElementById('hero-bg-img');
  if (img) img.src = f.background_image;

  setText('hero-badge', f.badge);
  setText('hero-headline', f.headline);
  setText('hero-sub', f.subheadline);

  const ctaPrimary = document.getElementById('hero-cta-primary');
  if (ctaPrimary) { ctaPrimary.textContent = f.cta_text; ctaPrimary.href = f.cta_url || '#'; }

  const ctaSecondary = document.getElementById('hero-cta-secondary');
  const ctaSecText   = document.getElementById('hero-cta-secondary-text');
  if (ctaSecondary) ctaSecondary.href = f.cta_secondary_url || '#';
  if (ctaSecText)   ctaSecText.textContent = f.cta_secondary_text;

  // Stats
  const statsEl = document.getElementById('hero-stats');
  if (statsEl && f.stats) {
    f.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'hero-stat stagger-item';
      div.innerHTML = `
        <span class="hero-stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0<span class="suffix">${s.suffix}</span></span>
        <span class="hero-stat-label">${s.label}</span>
      `;
      statsEl.appendChild(div);
    });
  }
}

// ---- About ----
function renderAbout(section) {
  const f = section.fields;
  const badgeEl = document.getElementById('about-badge');
  if (badgeEl) badgeEl.textContent = f.badge;

  setText('about-headline', f.headline);
  setText('about-text', f.text);
  setText('about-text2', f.text2);

  const imgEl = document.getElementById('about-image');
  if (imgEl) imgEl.src = f.image;

  const statsEl = document.getElementById('about-stats');
  if (statsEl && f.stats) {
    f.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'about-stat stagger-item';
      div.innerHTML = `
        <div class="about-stat-value" data-count="${s.value}" data-suffix="${s.suffix}">0<span class="suffix">${s.suffix}</span></div>
        <div class="about-stat-label">${s.label}</div>
      `;
      statsEl.appendChild(div);
    });
  }
}

// ---- Services (zigzag) ----
function renderServices(section) {
  const f = section.fields;
  setBadgeCenter('services-badge', f.badge);
  setText('services-headline', f.headline);
  setText('services-sub', f.subheadline);

  const list = document.getElementById('services-list');
  if (!list || !f.items) return;

  f.items.forEach((item, i) => {
    const reversed = i % 2 !== 0;
    const row = document.createElement('div');
    row.className = `service-row${reversed ? ' is-reversed' : ''}`;
    row.setAttribute('data-section', section.id);
    row.setAttribute('data-field', 'items');
    row.setAttribute('data-item', item.id);

    row.innerHTML = `
      <div class="service-content ${reversed ? 'slide-right' : 'slide-left'}">
        <div class="service-num">${item.number}</div>
        <div class="service-icon">${icon(item.icon, '#C97B1A')}</div>
        <h3 class="service-title">${item.title}</h3>
        <p class="service-desc">${item.description}</p>
      </div>
      <div class="service-img-col ${reversed ? 'slide-left' : 'slide-right'}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
      </div>
    `;
    list.appendChild(row);
  });
}

// ---- Gallery ----
function renderGallery(section) {
  const f = section.fields;
  setBadgeCenter('gallery-badge', f.badge);
  setText('gallery-headline', f.headline);
  setText('gallery-sub', f.subheadline);

  const grid = document.getElementById('gallery-grid');
  if (!grid || !f.items) return;

  f.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'gallery-item stagger-item';
    div.innerHTML = `
      <a href="${item.image}" class="glightbox" data-gallery="gallery-mk" data-title="${item.caption}" aria-label="${item.caption}">
        <img src="${item.image}" alt="${item.caption}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-caption">${item.caption}</span>
        </div>
        <div class="gallery-zoom">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>
        </div>
      </a>
    `;
    grid.appendChild(div);
  });
}

// ---- Features ----
function renderFeatures(section) {
  const f = section.fields;
  setBadgeCenter('features-badge', f.badge);
  setText('features-headline', f.headline);
  setText('features-sub', f.subheadline);

  const grid = document.getElementById('features-grid');
  if (!grid || !f.items) return;

  f.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'feature-card stagger-item';
    div.innerHTML = `
      <div class="feature-icon">${icon(item.icon, '#C97B1A')}</div>
      <h3 class="feature-title">${item.title}</h3>
      <p class="feature-desc">${item.description}</p>
    `;
    grid.appendChild(div);
  });
}

// ---- Process ----
function renderProcess(section) {
  const f = section.fields;
  setBadgeCenter('process-badge', f.badge);
  setText('process-headline', f.headline);
  setText('process-sub', f.subheadline);

  const steps = document.getElementById('process-steps');
  if (!steps || !f.items) return;

  f.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'process-step stagger-item';
    div.innerHTML = `
      <div class="process-step-circle">${item.step}</div>
      <h3 class="process-step-title">${item.title}</h3>
      <p class="process-step-desc">${item.description}</p>
    `;
    steps.appendChild(div);
  });
}

// ---- Contact ----
function renderContact(section, data) {
  const f = section.fields;

  const badgeEl = document.getElementById('contact-badge');
  if (badgeEl) badgeEl.textContent = f.badge;
  setText('contact-headline', f.headline);
  setText('contact-sub', f.subheadline);

  // Contact cards
  const cards = document.getElementById('contact-cards');
  if (cards) {
    const cardData = [
      { icon: 'phone',    label: 'Telefón',         value: f.phone,        href: f.phone_url,             note: null },
      { icon: 'mail',     label: 'E-mail',           value: f.email,        href: `mailto:${f.email}`,     note: null },
      { icon: 'location', label: 'Adresa',           value: f.address_label, href: null,                   note: null },
      { icon: 'time',     label: 'Pracovné hodiny',  value: f.working_hours, href: null,                   note: f.working_hours_note },
    ];
    cardData.forEach(c => {
      const el = c.href ? document.createElement('a') : document.createElement('div');
      el.className = 'contact-card stagger-item';
      if (c.href) { el.href = c.href; }
      el.innerHTML = `
        <div class="contact-card-icon">${icon(c.icon, '#C97B1A')}</div>
        <div>
          <p class="contact-card-label">${c.label}</p>
          <p class="contact-card-value">${c.value}</p>
          ${c.note ? `<p class="contact-card-note">${c.note}</p>` : ''}
        </div>
      `;
      cards.appendChild(el);
    });
  }

  // Form labels & placeholders
  setLabel('label-name',    f.form_name_label);
  setLabel('label-phone',   f.form_phone_label);
  setLabel('label-email',   f.form_email_label);
  setLabel('label-message', f.form_message_label);
  setPlaceholder('form-name',    f.form_name_placeholder);
  setPlaceholder('form-phone',   f.form_phone_placeholder);
  setPlaceholder('form-email',   f.form_email_placeholder);
  setPlaceholder('form-message', f.form_message_placeholder);

  const submitBtn = document.getElementById('form-submit-btn');
  if (submitBtn) submitBtn.textContent = f.form_submit_text;

  const successEl = document.getElementById('form-success');
  if (successEl) successEl.textContent = f.form_success_text;
}

// ---- Footer ----
function renderFooter(section, data) {
  const f = section.fields;
  setText('footer-logo-text', f.logo_text);
  setText('footer-logo-sub', f.logo_sub);
  setText('footer-desc', f.description);
  setText('footer-copyright', f.copyright_text);

  const linksEl = document.getElementById('footer-links');
  if (linksEl && f.links) {
    f.links.forEach(link => {
      const li = document.createElement('li');
      const a  = document.createElement('a');
      a.href = link.url; a.textContent = link.label;
      li.appendChild(a); linksEl.appendChild(li);
    });
  }

  // Footer contact items (from contact section)
  const contactSection = data.sections.find(s => s.type === 'contact');
  const footerContactEl = document.getElementById('footer-contact-items');
  if (footerContactEl && contactSection) {
    const fc = contactSection.fields;
    footerContactEl.innerHTML = `
      <div class="footer-contact-item"><a href="${fc.phone_url}">${fc.phone}</a></div>
      <div class="footer-contact-item"><a href="mailto:${fc.email}">${fc.email}</a></div>
      <div class="footer-contact-item">${fc.address_label}</div>
    `;
  }
}

// ============================================================
// UTILITY HELPERS
// ============================================================
function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined && text !== null) el.textContent = text;
}
function setLabel(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}
function setPlaceholder(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.placeholder = text;
}
function setBadgeCenter(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

// ============================================================
// NAVBAR
// ============================================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  function updateNavbar() {
    if (window.scrollY > 60) {
      navbar.classList.remove('is-transparent');
      navbar.classList.add('is-solid');
    } else {
      navbar.classList.remove('is-solid');
      navbar.classList.add('is-transparent');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });
}

// ============================================================
// MOBILE MENU
// ============================================================
function initMobileMenu() {
  const btn   = document.getElementById('hamburger-btn');
  const menu  = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    btn.classList.toggle('is-active', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
  });

  // Close on nav link click
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('is-open');
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    });
  });
}

// ============================================================
// SMOOTH SCROLL (JS fallback for older Safari)
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================================
// SCROLL TO TOP
// ============================================================
function initScrollTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
// CONTACT FORM
// ============================================================
function initContactForm(data) {
  const form = document.getElementById('contact-form');
  const successEl = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Clear errors
    form.querySelectorAll('.form-input').forEach(el => el.classList.remove('has-error'));

    const name = form.querySelector('#form-name');
    const msg  = form.querySelector('#form-message');

    if (name && !name.value.trim()) { name.classList.add('has-error'); valid = false; }
    if (msg  && !msg.value.trim())  { msg.classList.add('has-error');  valid = false; }

    const emailEl = form.querySelector('#form-email');
    if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      emailEl.classList.add('has-error'); valid = false;
    }

    if (!valid) return;

    const btn = document.getElementById('form-submit-btn');
    if (btn) btn.textContent = 'Odosiela sa...';

    // Simulate send (no backend)
    setTimeout(() => {
      form.reset();
      if (successEl) successEl.classList.remove('hidden');
      if (btn) btn.textContent = data.sections.find(s => s.type === 'contact')?.fields?.form_submit_text || 'Odoslať správu';
      setTimeout(() => { if (successEl) successEl.classList.add('hidden'); }, 5000);
    }, 800);
  });

  // Remove error on input
  form.querySelectorAll('.form-input').forEach(el => {
    el.addEventListener('input', () => el.classList.remove('has-error'));
  });
}

// ============================================================
// GSAP ANIMATIONS
// ============================================================
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Respect prefers-reduced-motion — skip all animations
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ---- Hero entrance (load animation) ----
  const heroTL = gsap.timeline({ delay: 0.4 });
  heroTL
    .from('.hero-badge',    { y: 20, opacity: 0, duration: 0.5, ease: 'power2.out' })
    .from('.hero-headline', { y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.hero-sub',      { y: 30, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
    .from('.hero-ctas',     { y: 24, opacity: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
    .from('.hero-stats .stagger-item', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
    .from('.scroll-hint',   { opacity: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2');

  // ---- Fade Up elements ----
  gsap.utils.toArray('.fade-up').forEach(el => {
    gsap.from(el, {
      y: 40, opacity: 0, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ---- Slide Left ----
  gsap.utils.toArray('.slide-left').forEach(el => {
    gsap.from(el, {
      x: -55, opacity: 0, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ---- Slide Right ----
  gsap.utils.toArray('.slide-right').forEach(el => {
    gsap.from(el, {
      x: 55, opacity: 0, duration: 0.75, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // ---- Scale In ----
  gsap.utils.toArray('.scale-in').forEach(el => {
    gsap.from(el, {
      scale: 0.93, opacity: 0, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true }
    });
  });

  // ---- Stagger parents ----
  gsap.utils.toArray('.stagger-parent').forEach(parent => {
    const items = parent.querySelectorAll('.stagger-item');
    if (!items.length) return;
    gsap.from(items, {
      y: 28, opacity: 0, duration: 0.55, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: parent, start: 'top 82%', once: true }
    });
  });

  // ---- Animated number counters ----
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const suffixEl = el.querySelector('.suffix');
    const obj = { val: 0 };

    gsap.to(obj, {
      val: target, duration: 2, ease: 'power1.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      onUpdate: () => {
        const num = Math.floor(obj.val);
        el.childNodes[0].nodeValue = num;
        if (suffixEl) suffixEl.textContent = suffix;
      }
    });
  });

  // ---- Parallax on hero bg ----
  gsap.to('.hero-bg img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  // ---- Service rows: alternating slide ----
  document.querySelectorAll('.service-row').forEach((row, i) => {
    // Already handled by .slide-left / .slide-right on content/image cols
  });
}

// ============================================================
// GLIGHTBOX
// ============================================================
function initLightbox() {
  if (typeof GLightbox === 'undefined') return;
  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    skin: 'clean',
  });
}

// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================
function initLenis() {
  // Lenis disabled — it conflicts with GSAP ScrollTrigger's scroll position detection.
  // Smooth scrolling is handled by CSS scroll-behavior: smooth + JS scrollIntoView.
}

// ============================================================
// REMOVE LOADER
// ============================================================
function removeLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  loader.style.opacity = '0';
  setTimeout(() => loader.remove(), 500);
}
