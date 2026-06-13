document.querySelectorAll('[data-playground]').forEach((playground) => {
  const source = playground.dataset.source;
  const copyButton = playground.querySelector('[data-copy]');

  if (!source || !(copyButton instanceof HTMLButtonElement)) {
    return;
  }

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(source);

      const original = copyButton.textContent;

      copyButton.textContent = 'Copied!';

      setTimeout(() => {
        copyButton.textContent = original;
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  });
});
