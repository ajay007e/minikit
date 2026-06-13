import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';

hljs.registerLanguage('html', xml);

import { examples } from '../data/playground';

const preview = document.getElementById('playground-preview');
const editor = document.getElementById('playground-code');

let example = 0;

const TYPE_SPEED = 50;
const DELETE_SPEED = 30;
const PAUSE = 2500;

start();

async function start() {
  while (true) {
    const html = examples[example].html;

    await type(html);

    await wait(PAUSE);

    await erase(html);

    example = (example + 1) % examples.length;
  }
}

async function type(html) {
  for (let i = 1; i <= html.length; i++) {
    const current = html.slice(0, i);

    render(current);
    await wait(TYPE_SPEED);
  }
}

async function erase(html) {
  for (let i = html.length; i >= 0; i--) {
    const current = html.slice(0, i);

    render(current);
    await wait(DELETE_SPEED);
  }
}

function render(html) {
  preview.innerHTML = html;

  editor.innerHTML =
    hljs.highlight(html, {
      language: 'html',
    }).value + '<span class="cursor"></span>';
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
