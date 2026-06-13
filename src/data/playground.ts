export interface PlaygroundExample {
  name: string;
  html: string;
}

export const examples: PlaygroundExample[] = [
  {
    name: 'Primary Button',
    html: `<button class="button">Get Started</button>`,
  },

  {
    name: 'Outline Button',
    html: `<button class="button outline">Learn More</button>`,
  },

  {
    name: 'Ghost Button',
    html: `<button class="button ghost">Cancel</button>`,
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
    name: 'Text Input',
    html: `<input type="text" placeholder="Your name"/>`,
  },

  {
    name: 'Search Input',
    html: `<input type="search" placeholder="Search..."/>`,
  },

  {
    name: 'Spinner',
    html: `<div data-spinner aria-label="Loading"></div>`,
  },

  {
    name: 'Card',
    html: `<article data-card>
  <h3>MiniKit</h3>
  <p>Tiny HTML-first UI library.</p>
  <button class="button">Get Started</button>
</article>`,
  },
];
