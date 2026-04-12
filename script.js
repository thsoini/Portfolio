     const backdrop = document.getElementById('overlayBackdrop');
      const panel    = document.getElementById('overlayPanel');

      function openPost(card) {
        document.getElementById('overlayTitle').textContent = card.dataset.title;
        document.getElementById('overlayContent').innerHTML = card.dataset.content;

        const meta = document.getElementById('overlayMeta');
        meta.innerHTML = `
          <span>
            <svg class="icon-xs" style="display:inline;vertical-align:text-bottom" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            ${card.dataset.date}
          </span>
          <span>•</span>
          <span>${card.dataset.read}</span>`;

        const tagsEl = document.getElementById('overlayTags');
        tagsEl.innerHTML = card.dataset.tags
          .split(',')
          .map(t => `<span class="blog-tag">${t.trim()}</span>`)
          .join('');

        backdrop.classList.add('open');
        panel.scrollTop = 0;
        document.body.style.overflow = 'hidden';
      }

      function closeOverlay() {
        backdrop.classList.remove('open');
        document.body.style.overflow = '';
      }

      document.querySelectorAll('.blog-card').forEach(card => {
        card.addEventListener('click', () => openPost(card));
        card.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') openPost(card);
        });
      });

      document.getElementById('overlayClose').addEventListener('click', closeOverlay);
      backdrop.addEventListener('click', e => { if (e.target === backdrop) closeOverlay(); });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });