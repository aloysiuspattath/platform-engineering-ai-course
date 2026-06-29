import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

export default withNextra({
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/modules/:path*',
        destination: '/courses/platform-engineering/modules/:path*',
        permanent: true,
      },
      {
        source: '/labs/:path*',
        destination: '/courses/platform-engineering/labs/:path*',
        permanent: true,
      },
      {
        source: '/projects/:path*',
        destination: '/courses/platform-engineering/projects/:path*',
        permanent: true,
      },
      {
        source: '/quizzes/:path*',
        destination: '/courses/platform-engineering/quizzes/:path*',
        permanent: true,
      },
      {
        source: '/cheatsheets/:path*',
        destination: '/courses/platform-engineering/cheatsheets/:path*',
        permanent: true,
      }
    ]
  }
})
