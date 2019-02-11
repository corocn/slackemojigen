const pkg = require('./package')

module.exports = {
  mode: 'spa',

  /*
   ** Headers of the page
   */
  head: {
    title: 'Slack Emoji Generator - Slack絵文字ジェネレーター',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'google-site-verification', content: 'A-wiGtauu1jdzkCZqiD7PceFsf5sciISBuT4Ctv98vc' },
      { hid: 'description', name: 'description', content: 'Slack Emoji Generator はSlack用の絵文字を生成するツールです。複数フォントで絵文字を比べることができます。' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  webfontloader: {
    timeout: 30000,
    google: {
      families: [
        'M+PLUS+1p:100,300,400,500,700,800,900',
        'M+PLUS+Rounded+1c:100,300,400,500,700,800,900',
        'Noto+Sans+JP:100,300,400,500,700,900',
        'Noto+Sans+SC:100,300,400,500,700,900',
        'Noto+Sans+TC:100,300,400,500,700,900',
        'Noto+Serif+JP:200,300,400,500,600,700,900',
        'Noto+Serif+SC:200,300,400,500,600,700,900',
        'Noto+Serif+TC:200,300,400,500,600,700,900',
        'Kosugi',
        'Kosugi+Maru',
        'Sawarabi+Gothic',
        'Sawarabi+Mincho',
      ]
    }
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['~/assets/css/tailwind.css'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['@nuxtjs/google-analytics', {
      id: 'UA-134254520-1'
    }],
    'nuxt-webfontloader',
    ['nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        }
      ]
    }]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    //   // Run ESLint on save
    //   if (ctx.isDev && ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    // extend(config, ctx) {
    //   if (ctx.isClient) {
    //     config.devtool = 'cheap-module-eval-source-map'
    //   }
    // }
  }
}
