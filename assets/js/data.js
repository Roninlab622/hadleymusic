// data.js — single source of truth for loading + formatting concert data.
// Keeps fetch logic + display helpers in one place so pages stay thin.

const DATA_URL = 'data/concerts.json';

// Cache the in-flight fetch so home + concert pages share one network call
// across navigations within the same session (browser cache helps too, but
// this avoids a parse hit if both pages load on the same SPA navigation).
let _cache = null;

export async function loadConcerts() {
  if (_cache) return _cache;
  const res = await fetch(DATA_URL, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load concerts (${res.status})`);
  const data = await res.json();
  // Newest-first by date string (ISO sorts lexicographically).
  data.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  _cache = data;
  return data;
}

export function findConcert(list, id) {
  return list.find(c => c.id === id) || null;
}

// Human-readable date. If we only have month-precision, show "Month YYYY".
export function formatDate(iso, precision) {
  const d = new Date(iso + 'T12:00:00');
  if (Number.isNaN(d.getTime())) return iso;
  const opts = precision === 'day'
    ? { year: 'numeric', month: 'long', day: 'numeric' }
    : { year: 'numeric', month: 'long' };
  return d.toLocaleDateString('en-US', opts);
}

// Duration in "1h 23m" or "27m" form. Avoids "0h" prefix for short ones.
export function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return '';
  const h = Math.floor(seconds / 3600);
  const m = Math.round((seconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// Pretty ensemble label from the slug stored in JSON.
export function ensembleLabel(slug) {
  switch (slug) {
    case 'hes':      return 'Hadley Elementary';
    case 'hopkins':  return 'Hopkins Academy';
    case 'district': return 'All District';
    default:         return slug;
  }
}

// YouTube thumbnail URL. hqdefault is reliably present for every video;
// maxresdefault is bigger but missing on older uploads, so we use hq as the
// safe default. Pages can upgrade to maxres with an <img onerror> fallback.
export function thumbUrl(videoId, quality = 'hq') {
  const q = quality === 'maxres' ? 'maxresdefault' : 'hqdefault';
  return `https://i.ytimg.com/vi/${videoId}/${q}.jpg`;
}

// youtube-nocookie keeps us out of the tracking domain until a user clicks
// play. autoplay=1 because the user just clicked the thumbnail — they expect
// playback to start without a second click on YouTube's own play button.
export function embedUrl(videoId) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}
