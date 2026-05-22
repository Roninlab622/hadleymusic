// home.js — homepage grid + filters.
// Reads concerts.json, renders cards, wires filter chips + year dropdown.

import {
  loadConcerts, formatDate, formatDuration,
  ensembleLabel, thumbUrl,
} from './data.js';

const state = {
  all: [],
  ensemble: 'all',  // 'all' | 'hes' | 'hopkins' | 'district'
  year: 'all',      // 'all' | number-as-string
};

function renderCards(list) {
  const grid = document.getElementById('concert-grid');
  const meta = document.getElementById('results-meta');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = '<div class="empty-state">No concerts match these filters.</div>';
    meta.textContent = 'Showing 0 concerts';
    return;
  }

  meta.textContent = `Showing ${list.length} of ${state.all.length} concerts`;

  const frag = document.createDocumentFragment();
  for (const c of list) {
    const card = document.createElement('article');
    card.className = 'concert-card';
    card.innerHTML = `
      <a class="card-link" href="concert.html?id=${encodeURIComponent(c.id)}">
        <div class="thumb">
          <img src="${thumbUrl(c.video_id, 'hq')}" alt="" loading="lazy" decoding="async">
          ${c.duration_seconds ? `<span class="duration">${formatDuration(c.duration_seconds)}</span>` : ''}
        </div>
        <div class="body">
          <span class="ensemble-badge ${c.ensemble}">${ensembleLabel(c.ensemble)}</span>
          <h3>${escapeHtml(c.title)}</h3>
          <div class="meta">
            <span>${formatDate(c.date, c.date_precision)}</span>
          </div>
        </div>
      </a>
    `;
    frag.appendChild(card);
  }
  grid.appendChild(frag);
}

// Tiny escape helper — concert titles come from a hand-edited JSON file
// but we still escape on render so a stray "<" never breaks layout.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function applyFilters() {
  let list = state.all;
  if (state.ensemble !== 'all') list = list.filter(c => c.ensemble === state.ensemble);
  if (state.year !== 'all')     list = list.filter(c => String(c.year) === state.year);
  renderCards(list);
}

function wireEnsembleChips() {
  const chips = document.querySelectorAll('.chip[data-ensemble]');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      state.ensemble = chip.dataset.ensemble;
      chips.forEach(c => c.classList.toggle('active', c === chip));
      applyFilters();
    });
  });
}

function wireYearSelect() {
  const sel = document.getElementById('year-select');
  // Years pulled from the data so they stay correct as concerts are added.
  const years = [...new Set(state.all.map(c => c.year))].sort((a, b) => b - a);
  sel.innerHTML = '<option value="all">All years</option>'
    + years.map(y => `<option value="${y}">${y}</option>`).join('');
  sel.addEventListener('change', () => {
    state.year = sel.value;
    applyFilters();
  });
}

async function init() {
  try {
    state.all = await loadConcerts();
    wireEnsembleChips();
    wireYearSelect();
    applyFilters();
  } catch (err) {
    console.error(err);
    document.getElementById('concert-grid').innerHTML =
      '<div class="empty-state">Could not load concerts. Please refresh.</div>';
  }
}

init();
