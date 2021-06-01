import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import api from '../../../config';
import '../styles/_discover.scss';
//import spotifyApi from 'spotify-web-api-js';

export default class Discover extends Component {
  constructor() {
    super();
    
    this.state = {
      loading: true,
      token: '',
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  async componentDidMount() {
    // FETCH TOKEN
    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded', 
            'Authorization' : 'Basic ' + btoa(`${api.api.clientId}:${api.api.clientSecret}`)
        },
        body: 'grant_type=client_credentials'
    });
    const data = await result.json();
    this.setState({loading: false});
    this.setState({token: data.access_token})
    console.log(this.state);

    // GET NEW RELEASES AND SET STATE
    const newReleases = await fetch('https://api.spotify.com/v1/browse/new-releases?country=US&limit=15', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${this.state.token}`
        },
    });
    const data2 = await newReleases.json();
    this.setState({newReleases: data2.albums.items});

    // GET FEATURED PLAYLISTS AND SET STATE
    const featuredPlaylists = await fetch('https://api.spotify.com/v1/browse/featured-playlists?country=US&limit=15', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${this.state.token}`
        },
    });
    const data3 = await featuredPlaylists.json();
    this.setState({playlists: data3.playlists.items});

    // BROWSE CATEGORIES AND SET STATE
    const browseCategories = await fetch('https://api.spotify.com/v1/browse/categories?country=US&limit=15', {
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${this.state.token}`
        },
    });
    const data4 = await browseCategories.json();
    this.setState({categories: data4.categories.items});
  }
  

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        {this.state.loading ? <DiscoverBlock text="...LOADING NEW RELEASES" id="loading" data={newReleases} />
          :<DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />}
        {this.state.loading ? <DiscoverBlock text="...LOADING FEATURED PLAYLISTS" id="loading" data={newReleases} />
          :<DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />}
        {this.state.loading ? <DiscoverBlock text="...LOADING CATEGORIES TO BROWSE" id="loading" data={newReleases} />
          :<DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />}
      </div>
    );
  }
}