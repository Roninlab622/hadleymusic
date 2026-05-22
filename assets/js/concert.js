// concert.js — detail page. Reads ?id=, finds concert, renders + mounts player.

import { loadConcerts, findConcert, formatDate, formatDuration, ensembleLabel } from './data.js';
import { mountLiteEmbed } from './lite-youtube.js';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderNotFound() {
  const wrap = document.getElementById('detail-root');
  wrap.innerHTML = `
    <div class="empty-state" style="padding:4rem 1rem;">
      <h1 style="margin-bottom:.5rem;">Concert not found</h1>
      <p>That concert isn't in our archive yet.</p>
      <p style="margin-top:1rem;"><a class="back-link" href="./">← Back to all concerts</a></p>
    </div>
  `;
}

function render(concert) {
  const wrap = document.getElementById('detail-root');
  const pageTitle = `${concert.title} — ${formatDate(concert.date, concert.date_precision)}`;
  document.title = `${pageTitle} | Hadley Music`;

  wrap.innerHTML = `
    <a class="back-link" href="./">← All concerts</a>

    <header class="detail-header">
      <span class="ensemble-badge ${concert.ensemble}">${ensembleLabel(concert.ensemble)}</span>
      <h1>${escapeHtml(concert.title)}</h1>
      <div class="meta-row">
        <span>${formatDate(concert.date, concert.date_precision)}</span>
        ${concert.duration_seconds ? `<span>•</span><span>${formatDuration(concert.duration_seconds)}</span>` : ''}
      </div>
    </header>

    <div class="player-frame" id="player-frame"></div>

    <div class="detail-actions">
      <a class="btn btn-secondary" href="https://www.youtube.com/watch?v=${encodeURIComponent(concert.video_id)}" target="_blank" rel="noopener">
        Watch on YouTube
      </a>
      <button class="btn disabled" disabled aria-disabled="true" title="Downloads will come from the Hadley Media archive in a future phase.">
        Download
        <span class="pill">Coming soon</span>
      </button>
    </div>

    <section class="detail-body">
      <h2>About this concert</h2>
      ${concert.description
        ? `<p>${escapeHtml(concert.description)}</p>`
        : `<p class="desc-placeholder">Program details for this concert will be added soon. In the meantime, the full performance is available above.</p>`
      }
    </section>
  `;

  mountLiteEmbed(document.getElementById('player-frame'), concert.video_id, concert.title);
}

async function init() {
  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) { renderNotFound(); return; }
  try {
    const list = await loadConcerts();
    const concert = findConcert(list, id);
    if (!concert) { renderNotFound(); return; }
    render(concert);
  } catch (err) {
    console.error(err);
    renderNotFound();
  }
}

init();
