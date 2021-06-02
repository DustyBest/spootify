import { api } from '../config';

// GET TOKEN
export const getToken = async () => {
    try {
        const newToken = await fetch(api.authUrl, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded', 
                'Authorization' : 'Basic ' + btoa(`${api.clientId}:${api.clientSecret}`)
            },
            body: 'grant_type=client_credentials'
        });
        if(!newToken.ok) {
        throw Error('We had a problem getting a token');
        }
        const data = await newToken.json();
        const token = data.access_token;
        return token;
    } 
    catch(error) {
        console.log(error.message);
        return false;
    }  
}

// GET NEW RELEASES
export const getNewReleases = async (token) => {
    try{
        let URL = api.baseUrl 
                + api.endpoints.newReleases 
                + api.params.country 
                + api.params.limit
        const newReleases = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        });
        if(!newReleases.ok) {
        throw Error('We had a problem getting new releases');
        }
        const data = await newReleases.json();
        const releases = data.albums.items;
        return releases;
    }
    catch(error) {
        console.log(error.message);
        return [];
    }
}

// GET FEATURED PLAYLISTS
export const getFeaturedPlaylists = async (token) => { 
    try{
        let URL = api.baseUrl 
                + api.endpoints.featuredPlaylists 
                + api.params.country 
                + api.params.limit
        const featuredPlaylists = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        });
        if(!featuredPlaylists.ok) {
            throw Error('We had a problem getting featured playlists');
        }
        const data = await featuredPlaylists.json();
        const playlists = data.playlists.items;
        return playlists;
    }
    catch(error) {
        console.log(error.message);
        return [];
    }
}

// GET CATEGORIES TO BROWSE
export const getCategories = async (token) => {
    try{
        let URL = api.baseUrl 
                + api.endpoints.browseCategories 
                + api.params.country 
                + api.params.limit
        const browseCategories = await fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
        });
        if(!browseCategories.ok) {
            throw Error('We had a problem getting categories to browse');
        }
        const data = await browseCategories.json();
        const categories = data.categories.items;
        return categories
    }
    catch(error){
        console.log(error.message);
        return [];
    }
}