import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import { getToken, getNewReleases, getFeaturedPlaylists, getCategories } from '../../../config';
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
    const token = await getToken()
    this.setState({token: token});
    this.setState({loading: false});
    this.setState({newReleases: await getNewReleases(token)});
    this.setState({playlists: await getFeaturedPlaylists(token)});
    this.setState({categories: await getCategories(token)});
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