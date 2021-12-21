export default {
  loginUser: 'POST /admin/login',
  logout: '/users/logout',
  countriesList: 'GET /common/get-countries',
  seasonsList: 'GET /common/get-seasons',
  uploadFile: 'POST /admin/upload-files',
  getAllContest: 'POST /admin/slider/get-contests',

  usersList: 'POST /admin/users/list',
  usersDetails: 'GET /admin/users/view/:id',
  createUser: 'POST /admin/users/create',
  editUser: 'PUT /admin/users/update/:id',
  deleteUser: 'DELETE /admin/users/delete/:id',
  toggleUserStatus: 'PUT /admin/users/status/:id',

  leaguesList: 'POST /admin/feed/leagues/list',
  leaguesDetails: 'GET /admin/feed/leagues/view/:id',
  createLeague: 'POST /admin/feed/leagues/create',
  editLeague: 'PUT /admin/feed/leagues/:id',
  deleteLeague: 'DELETE /admin/feed/leagues/:id',
  toggleLeaguesStatus: 'PUT /admin/feed/leagues/status/:id',

  teamsList: 'POST /admin/feed/teams/list',
  teamsDetails: 'GET /admin/feed/teams/view/:id',
  createTeam: 'POST /admin/feed/teams/create',
  editTeam: 'PUT /admin/feed/teams/:id',
  deleteTeam: 'DELETE /admin/feed/teams/:id',

  competitionsList: 'POST /admin/competitions/list',
  competitionsDetails: 'GET /admin/competitions/:id',
  createCompetitions: 'POST /admin/competitions/create',
  editCompetitions: 'PUT /admin/competitions/update/:id',
  deleteCompetitions: 'DELETE /admin/competitions/delete/:id',

  userContestsList: 'POST /admin/user-contest/list',
  userContestsDetails: 'GET /admin/user-contest/view/:id',

  sponsoredKKContestsList:
    'POST /admin/sponsored-kk-contest/get-contests-by-category',
  sponsoredKKContestsDetails: 'POST /admin/sponsored-kk-contest/get-contest',
  createSponsoredKKContests: 'POST /admin/sponsored-kk-contest/create',
  editSponsoredKKContests: 'PUT /admin/sponsored-kk-contest/update-contest',
  deleteSponsoredKKContests:
    'DELETE /admin/sponsored-kk-contest/delete-contest/:id',

  getMatchesList: 'POST /admin/competitions/get-matches-by-date-league',

  sliderList: 'POST /admin/slider/get-sliders',
  sliderDetails: 'POST /admin/slider/get-slider-images',
  createSlider: 'POST /admin/slider/create',
  editSlider: 'PUT /admin/slider/update-slider-image',
  deleteSliderImage: 'DELETE /admin/slider/delete-slider-image/:id',

  bannersList: 'POST /admin/banner/get-banners',
  bannerDetails: 'POST /admin/banner/get-banner',
  createBanner: 'POST /admin/banner/create',
  editBanner: 'PUT /admin/banner/update-banner',
  deleteBanner: 'DELETE /admin/banner/delete-banner/:id',
}
