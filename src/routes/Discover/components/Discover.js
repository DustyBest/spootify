import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
// I placed my api calls in the provided config.js file with the included api object. 👍
import { getToken, getNewReleases, getFeaturedPlaylists, getCategories } from '../../../config';

export default class Discover extends Component {
  constructor() {
    super();
    
    // Added token and a loading flag to state. Loading is a very quick implementation. 
    // I only render full <Discover Block>'s once getToken() returns. Before then, the 
    // rendered <Discover Block>'s 'text' attribute simply says '...loading'
    this.state = {
      loading: true,
      token: '',
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  // When the component mounts, I await my call to get a token.
  // Once I've got it, I use it in my other calls to push data into 
  // my state object.
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

    // The only change I made below was to conditionally load the
    // <Discover Black>'s
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