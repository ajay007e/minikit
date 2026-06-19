export interface PlaygroundExample {
  name: string;
  html: string;
}

export const examples: PlaygroundExample[] = [
  {
    name: 'Primary Button',
    html: `<button>Get Started</button>`,
  },

  {
    name: 'Outline Button',
    html: `<button data-style="outline">Learn More</button>`,
  },

  {
    name: 'Ghost Button',
    html: `<button data-style="ghost">Cancel</button>`,
  },

  {
    name: 'Badge',
    html: `<span data-badge>New</span>`,
  },

  {
    name: 'Success Badge',
    html: `<span data-badge data-variant="success">Stable</span>`,
  },

  {
    name: 'Warning Badge',
    html: `<span data-badge data-variant="warning">Beta</span>`,
  },

  {
    name: 'Danger Badge',
    html: `<span data-badge data-variant="danger">Deprecated</span>`,
  },

  {
    name: 'Text Input',
    html: `<input type="text" placeholder="Your name" />`,
  },

  {
    name: 'Checkbox',
    html: `<label>
  <input type="checkbox" checked />
  Accept terms
</label>`,
  },

  {
    name: 'Radio Group',
    html: `<div class="vstack gap-2">
  <label><input type="radio" name="plan" checked /> Starter</label>
  <label><input type="radio" name="plan" /> Pro</label>
</div>`,
  },

  {
    name: 'Switch',
    html: `<label>
  <input type="checkbox" role="switch" checked />
  Dark mode
</label>`,
  },

  {
    name: 'Progress',
    html: `<progress value="65" max="100"></progress>`,
  },

  {
    name: 'Spinner',
    html: `<div aria-busy="true"></div>`,
  },

  {
    name: 'Avatar',
    html: `<figure data-variant="avatar">
  JD
</figure>`,
  },

  {
    name: 'Avatar Group',
    html: `<figure data-variant="avatar" role="group">
  <figure data-variant="avatar">JD</figure>
  <figure data-variant="avatar">MK</figure>
  <figure data-variant="avatar">AL</figure>
</figure>`,
  },

  {
    name: 'Alert',
    html: `<div role="alert" data-variant="success">
  Changes saved successfully.
</div>`,
  },

  {
    name: 'Card',
    html: `<article data-card>
  <header>
    <h3>MiniKit</h3>
  </header>

  <p>Tiny HTML-first UI library.</p>

  <footer>
    <button>Get Started</button>
  </footer>
</article>`,
  },
];
