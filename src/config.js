export const api = {
  baseUrl: 'https://api.spotify.com/v1',
  authUrl: 'https://accounts.spotify.com/api/token',
  clientId: 'd8e732290c524ba4877b514823244727',
  clientSecret: '57f2aab95f1b46268830370bdf53d661',
  endpoints: {
    newReleases: '/browse/new-releases',
    featuredPlaylists: '/browse/featured-playlists',
    browseCategories: '/browse/categories'
  },
  params: {
    country: '?country=JP',
    limit: '&limit=15'
  }
}