// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'The Unv language',
  tagline: 'The Universal programming language',
  url: 'https://unv.vercel.app',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Unvlabs',
  projectName: 'The UNV site',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/unvlabs/site/edit/main/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/unvlabs/site/edit/main/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Unv Language',
        logo: {
          alt: 'World needs an universal programming language.',
          src: 'img/logo.svg',
        },
        items: [
          { to: '/playground', label: 'Playground', position: 'left' },
          {
            type: 'doc',
            docId: 'tutorial/introduction',
            position: 'left',
            label: 'Tutorial',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            href: 'https://github.com/unvlabs/site',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/tutorial/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/unv',
              },
              // {
              //   label: 'Discord',
              //   href: 'https://discordapp.com/invite/unv',
              // },
              // {
              //   label: 'Twitter',
              //   href: 'https://twitter.com/unv',
              // },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Playground',
                to: '/playground',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/unvlabs/site',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} UnvLabs. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
