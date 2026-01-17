/*
  Utkarsh Srivastava — Portfolio interactions
  - Loading screen
  - Mobile nav
  - Smooth scroll assistance
  - Project filtering
  - Modal details
  - Reveal on scroll
  - Contact mailto composer
*/

const PROJECTS = [
  
  {
    id: 'p1',
    title: 'Electricity Consumption Forecasting',
    blurb: 'Regression-based forecasting system to predict electricity consumption trends from historical data.',
    icon: 'fa-bolt',
    tags: ['python', 'ml', 'analytics'],
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Regression'],
    features: [
      'Performed data cleaning, feature engineering, and exploratory data analysis',
      'Built and evaluated regression models for accurate consumption forecasting',
      'Visualized trends and predictions for decision support',
      'Focused on real-world energy demand use cases'
    ],
    links: {
      github: 'https://github.com/karshsri/Electricity-Consumption-Regression-Forecast',
      demo: '#',
      docs: '#'
    },
    shots: ['EDA', 'Regression Model', 'Forecast Results'],
    category: 'Machine Learning'
  },

  {
    id: 'p2',
    title: 'British Airways Data Analysis',
    blurb: 'Customer sentiment and operational insights analysis using real airline review and service data.',
    icon: 'fa-plane',
    tags: ['python', 'analytics', 'sql'],
    tech: ['Python', 'Pandas', 'Data Analysis', 'Visualization'],
    features: [
      'Analyzed airline customer reviews to uncover satisfaction drivers',
      'Identified trends impacting customer experience and service quality',
      'Created visual insights to support data-driven airline decisions',
      'Applied analytical thinking to a real-world business dataset'
    ],
    links: {
      github: 'https://github.com/karshsri/British_airline_analysis',
      demo: '#',
      docs: '#'
    },
    shots: ['Data Cleaning', 'Insights', 'Visual Analysis'],
    category: 'Data Analytics'
  },

  {
    id: 'p3',
    title: 'Data Professional Survey Analysis',
    blurb: 'Comprehensive survey analysis uncovering trends in salaries, skills, and career paths of data professionals.',
    icon: 'fa-chart-bar',
    tags: ['powerbi', 'analytics', 'sql'],
    tech: ['Power BI', 'Data Visualization', 'Survey Analysis'],
    features: [
      'Cleaned and transformed raw survey data for analysis',
      'Built an interactive Power BI dashboard for storytelling',
      'Analyzed salary trends, tools, and job satisfaction',
      'Designed visuals for recruiter and business audiences'
    ],
    links: {
      github: 'https://github.com/karshsri/Data-Professional-survey',
      demo: '#',
      docs: '#'
    },
    shots: ['Dashboard', 'Salary Trends', 'Skill Insights'],
    category: 'Dashboard'
  }
];


const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setYear(){
  const el = $('#year');
  if(el) el.textContent = String(new Date().getFullYear());
}

function hideLoader(){
  const loader = $('#loader');
  if(!loader) return;
  loader.classList.add('is-hidden');
}

function setupMobileNav(){
  const toggle = $('#navToggle');
  const menu = $('#navMenu');
  if(!toggle || !menu) return;

  const close = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  $$('.nav__link', menu).forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
  document.addEventListener('click', (e) => {
    if(!menu.classList.contains('is-open')) return;
    const within = menu.contains(e.target) || toggle.contains(e.target);
    if(!within) close();
  });
}

function buildProjectCard(p){
  const tags = p.tech.slice(0, 3).map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  const allTags = p.tags.join(' ');

  return `
    <article class="project reveal" data-id="${p.id}" data-tags="${allTags}" tabindex="0" role="button" aria-label="Open details for ${escapeHtml(p.title)}">
      <div class="project__top">
        <div>
          <h3 class="project__title">${escapeHtml(p.title)}</h3>
          <p class="project__desc">${escapeHtml(p.blurb)}</p>
        </div>
        <div class="project__thumb" aria-hidden="true"><i class="fa-solid ${escapeHtml(p.icon)}"></i></div>
      </div>

      <div class="project__tags">${tags}</div>

      <div class="project__meta">
        <div class="project__cta">Open details <i class="fa-solid fa-arrow-right"></i></div>
        <div class="tag">${escapeHtml(p.category)}</div>
      </div>
    </article>
  `;
}

function renderProjects(){
  const grid = $('#projectsGrid');
  if(!grid) return;
  grid.innerHTML = PROJECTS.map(buildProjectCard).join('');

  // Click + keyboard open
  $$('.project', grid).forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.id));
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(card.dataset.id);
      }
    });
  });
}

function setupFilters(){
  const buttons = $$('.filter');
  const grid = $('#projectsGrid');
  if(!buttons.length || !grid) return;

  const apply = (filter) => {
    buttons.forEach(b => b.classList.toggle('is-active', b.dataset.filter === filter));
    $$('.project', grid).forEach(card => {
      const tags = (card.dataset.tags || '').split(' ');
      const show = filter === 'all' ? true : tags.includes(filter);
      card.hidden = !show;
    });
  };

  buttons.forEach(btn => btn.addEventListener('click', () => apply(btn.dataset.filter)));
}

function openProject(id){
  const p = PROJECTS.find(x => x.id === id);
  if(!p) return;

  const modal = $('#projectModal');
  const content = $('#modalContent');
  if(!modal || !content) return;

  content.innerHTML = buildModal(p);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Focus close button for accessibility
  const closeBtn = $('[data-close="true"]', modal);
  if(closeBtn) closeBtn.focus();
}

function closeModal(){
  const modal = $('#projectModal');
  const content = $('#modalContent');
  if(!modal || !content) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  // optional: clear content
  // content.innerHTML = '';
}

function setupModal(){
  const modal = $('#projectModal');
  if(!modal) return;

  modal.addEventListener('click', (e) => {
    const close = e.target?.dataset?.close === 'true' || e.target.closest('[data-close="true"]');
    if(close) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
}

function buildModal(p){
  const tech = p.tech.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join(' ');
  const features = p.features.map(f => `<li>${escapeHtml(f)}</li>`).join('');
  const links = [
    {label:'GitHub', href:p.links.github, icon:'fa-github'},
    {label:'Live Demo', href:p.links.demo, icon:'fa-up-right-from-square'},
    {label:'Documentation', href:p.links.docs, icon:'fa-book'}
  ].map(l => {
    const disabled = !l.href || l.href === '#';
    return `
      <a class="link" href="${disabled ? 'javascript:void(0)' : escapeAttr(l.href)}" ${disabled ? 'aria-disabled="true" tabindex="-1"' : 'target="_blank" rel="noreferrer"'}>
        <span>${escapeHtml(l.label)}</span>
        <i class="fa-solid ${l.icon.startsWith('fa-') ? l.icon : 'fa-link'} ${l.icon === 'fa-github' ? 'fa-brands fa-github' : ''}"></i>
      </a>
    `;
  }).join('');

  const shots = (p.shots || []).slice(0,3).map(s => `
    <div class="shot" role="img" aria-label="${escapeAttr(s)} screenshot placeholder">
      <div class="shot__label">${escapeHtml(s)}</div>
    </div>
  `).join('');

  return `
    <div class="modal__hero">
      <div class="modal__icon" aria-hidden="true"><i class="fa-solid ${escapeHtml(p.icon)}"></i></div>
      <div class="modal__hgroup">
        <h3>${escapeHtml(p.title)}</h3>
        <p>${escapeHtml(p.blurb)}</p>
        <div class="project__tags" style="margin-top:12px">${tech}</div>
      </div>
    </div>

    <div class="modal__grid">
      <div class="card">
        <h4>Key Features / Achievements</h4>
        <ul class="list">${features}</ul>
      </div>
      <div class="card">
        <h4>Links</h4>
        <div class="links">${links}</div>
        <p style="margin:12px 0 0; color: var(--muted2); font-size: 12px; line-height:1.6;">
          Placeholders are currently “#”. Replace with your real GitHub/demo/docs URLs.
        </p>
      </div>
    </div>

    <div class="modal__shots">
      ${shots}
    </div>
  `;
}

function setupReveal(){
  const els = $$('.reveal');
  if(!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if(ent.isIntersecting){
        ent.target.classList.add('is-visible');
        io.unobserve(ent.target);
      }
    });
  }, {threshold: 0.12});

  els.forEach(el => io.observe(el));
}

function setupContactForm(){
  const form = $('#contactForm');
  if(!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = ($('#name')?.value || '').trim();
    const email = ($('#email')?.value || '').trim();
    const message = ($('#message')?.value || '').trim();

    const subject = encodeURIComponent(`Portfolio Inquiry - Utkarsh Srivastava${name ? ' (from ' + name + ')' : ''}`);
    const body = encodeURIComponent(
      `Name: ${name || '-'}\nEmail: ${email || '-'}\n\nMessage:\n${message || '-'}`
    );

    // Replace with your real email in index.html as well
    window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
  });
}

function escapeHtml(str=''){
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
function escapeAttr(str=''){ return escapeHtml(str); }

window.addEventListener('load', () => {
  setYear();
  renderProjects();
  setupFilters();
  setupModal();
  setupMobileNav();
  setupReveal();
  setupContactForm();

  // Slight delay for polish
  setTimeout(hideLoader, 450);
});
