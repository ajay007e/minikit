import { components } from './components';

export const navigation = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Introduction',
        href: '/getting-started/',
        page: 'introduction',
      },
      {
        title: 'Installation',
        href: '/installation/',
        page: 'installation',
      },
    ],
  },

  {
    title: 'Customization',
    items: [
      {
        title: 'How to customize',
        href: '/customization/how/',
        page: 'how',
      },
      {
        title: 'CSS variables',
        href: '/customization/css-variables/',
        page: 'css-variables',
      },
      {
        title: 'Theme',
        href: '/customization/theme/',
        page: 'theme',
      },
    ],
  },

  {
    title: 'Components',
    items: [
      {
        title: 'Overview',
        href: '/components/',
        page: 'components',
      },

      ...components.map((component) => ({
        title: component.title,
        href: component.href,
        page: component.slug,
      })),
    ],
  },
];
