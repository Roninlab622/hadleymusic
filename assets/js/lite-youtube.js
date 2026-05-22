// lite-youtube.js — click-to-play YouTube embed.
// Renders a clickable thumbnail; on click, swaps in the real iframe. This
// keeps the YouTube player JS (~hundreds of KB) out of the initial page load.

import { thumbUrl, embedUrl } from './data.js';

// Build the placeholder thumbnail element. Caller drops it inside a sized
// container (.player-frame). On click, we replace ourselves with the iframe.
export function mountLiteEmbed(container, videoId, title) {
  container.innerHTML = '';

  const btn = document.createElement('button');
  btn.className = 'lite-thumb';
  btn.type = 'button';
  btn.setAttribute('aria-label', `Play: ${title}`);

  const img = document.createElement('img');
  // Try maxres first, fall back to hqdefault if YouTube doesn't have a
  // maxres image for this video (common on older uploads).
  img.src = thumbUrl(videoId, 'maxres');
  img.alt = '';
  img.loading = 'eager';
  img.decoding = 'async';
  img.addEventListener('error', () => {
    if (!img.dataset.fallback) {
      img.dataset.fallback = '1';
      img.src = thumbUrl(videoId, 'hq');
    }
  });

  const play = document.createElement('span');
  play.className = 'play-btn';
  play.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';

  btn.appendChild(img);
  btn.appendChild(play);
  container.appendChild(btn);

  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = embedUrl(videoId);
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    container.innerHTML = '';
    container.appendChild(iframe);
  }, { once: true });
}
