module.exports = {
  siteName: 'Koora Kings Fantasy',
  copyright: 'Koora Kings Fantasy  ©2020 ',
  logoPath: '/logo-koora.png',
  siteIcon: '/two_koora.png',
  appstore: '/icon-app-appstore.svg',
  googlestore: '/icon-app-googlestore.svg',
  mobiles: '/mobiles.png',
  sliderImage: '/sliderImage.png',
  sliderBackImg: '/sliderBackImg.svg',
  Triangle: '/Triangle.svg',
  downloadApp: '/downloadApp.svg',
  enjoyGaming: '/enjoyGaming.svg',
  createAccount: '/createAccount.svg',
  arrow: '/stre-right.svg',
  headerBG: '/hero@forweb.png',
  mapImage: '/mapImage.png',
  mapPin: '/mapPin.svg',
  lineFlow: '/lineFlow.svg',
  laligaLogo: '/laligaLogo.svg',
  iiphonexr: '/iiphonexr.png',
  googleplayBlack: '/googleplay-black.svg',
  iosBlack: '/ios-black.svg',
  footerBG: '/footerBG.png',
  googlePlayWhite: '/googleplay-white.svg',
  iosWhite: '/ios-white.svg',
  enFlag: '/enFlag.png',
  laliga: '/LeaguesLogo/laliga.png',
  leagueOne: '/LeaguesLogo/leagueOne.png',
  primeLeague: '/LeaguesLogo/primeLeague.png',
  saudiProLeague: '/LeaguesLogo/saudiProLeague.png',
  uefaChampionsLeague: '/LeaguesLogo/uefaChampionsLeague.png',
  apiUrl: 'https://koora-kings-prod-xtpeq2lztq-ey.a.run.app',
  apiPrefix: '',
  fixedHeader: true, // sticky primary layout header
  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'custom',
      include: [/(\/(en|zh))*\/(about|help|home)/],
      exclude: [
        /(\/(en|zh))*\/('users|feeds|teams|leagues|competitions|Contests|KKContests|sponsoredContests|slider|banners|login')/,
      ],
    },
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login|about|help|home/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '',
      },
      {
        key: 'ar',
        title: 'arabic',
        flag: '',
      },
    ],
    defaultLanguage: 'en',
  },
}
