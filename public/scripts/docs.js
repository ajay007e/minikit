/* Copy Buttons */

document.querySelectorAll('.copy-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.parentElement?.querySelector('code')?.innerText ?? '';

    try {
      await navigator.clipboard.writeText(code);

      clearTimeout(button._copyTimer);

      button.classList.add('copied');

      button.textContent = '✓ Copied';

      button._copyTimer = setTimeout(() => {
        button.classList.remove('copied');

        button.textContent = 'Copy';
      }, 2000);
    } catch {
      button.textContent = 'Failed';

      setTimeout(() => {
        button.textContent = 'Copy';
      }, 2000);
    }
  });
});

/* Table Of Contents */

const tocLinks = document.querySelectorAll('.page-nav a');

const sections = document.querySelectorAll('.content section[id]');

if (tocLinks.length && sections.length) {
  let activeId = sections[0]?.id;

  function updateActive(id) {
    activeId = id;

    tocLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;

      link.classList.toggle('active', active);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        updateActive(visible[0].target.id);
      }
    },
    {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  updateActive(activeId);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    const nearTop = scrollTop < 100;

    const nearBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;

    if (nearTop) {
      updateActive(sections[0].id);

      return;
    }

    if (nearBottom) {
      updateActive(sections[sections.length - 1].id);
    }
  });
}

const toggle = document.getElementById('sidebar-toggle');
const drawer = document.getElementById('mobile-sidebar');
const overlay = document.querySelector('.mobile-sidebar-overlay');
const close = document.getElementById('sidebar-close');

function openSidebar() {
  drawer.classList.add('open');
  overlay.classList.add('open');

  toggle.setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');

  toggle.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', openSidebar);

toggle?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openSidebar();
  }
});

close?.addEventListener('click', closeSidebar);
overlay?.addEventListener('click', closeSidebar);
