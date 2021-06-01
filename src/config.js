const api = {
  baseUrl: 'https://api.spotify.com/v1',
  authUrl: 'https://accounts.spotify.com/api/token',
  clientId: 'd8e732290c524ba4877b514823244727',
  clientSecret: '57f2aab95f1b46268830370bdf53d661'
}

// Below are my API calls. For query parameters I only attatched country (Japan) 
// and item limits (15). Since there were only 2, I hard coded them to the url string 
// rather than abstracting them out. I used Japan to make the results a bit interesting,
// and only returned 15 results to make the call ever so slightly faster.

// GET TOKEN
export const getToken = async () => {
  const newToken = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          'Content-Type' : 'application/x-www-form-urlencoded', 
          'Authorization' : 'Basic ' + btoa(`${api.clientId}:${api.clientSecret}`)
      },
      body: 'grant_type=client_credentials'
  });
  const data = await newToken.json();
  const token = data.access_token;
  return token;
}

// GET NEW RELEASES
export const getNewReleases = async (token) => {
  const newReleases = await fetch('https://api.spotify.com/v1/browse/new-releases?country=JP&limit=15', {
      method: 'GET',
      headers: {
          'Authorization' : `Bearer ${token}`
      },
  });
  const data = await newReleases.json();
  const releases = data.albums.items;
  return releases;
}

// GET FEATURED PLAYLISTS
export const getFeaturedPlaylists = async (token) => { 
  const featuredPlaylists = await fetch('https://api.spotify.com/v1/browse/featured-playlists?country=JP&limit=15', {
      method: 'GET',
      headers: {
          'Authorization' : `Bearer ${token}`
      },
  });
  const data = await featuredPlaylists.json();
  const playlists = data.playlists.items;
  return playlists;
}

// GET CATEGORIES TO BROWSE
export const getCategories = async (token) => {
  const browseCategories = await fetch('https://api.spotify.com/v1/browse/categories?country=JP&limit=15', {
      method: 'GET',
      headers: {
          'Authorization' : `Bearer ${token}`
      },
  });
  const data = await browseCategories.json();
  const categories = data.categories.items;
  return categories
}