import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
// I placed my api calls in the provided config.js file with the included api object. 👍
import { getToken, getNewReleases, getFeaturedPlaylists, getCategories } from '../../../config';

export default class Discover extends Component {
  constructor() {
    super();
    
    this.state = {
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
    //this.setState({token: token});
    //this.setState({loading: false});
    this.setState({newReleases: await getNewReleases(token)});
    this.setState({playlists: await getFeaturedPlaylists(token)});
    this.setState({categories: await getCategories(token)});
  }
  
  render() {
    const { newReleases, playlists, categories, loading } = this.state;

    // I conditionally render the <h2> inside the <Discover Block> component
    // with a prefix of '...LOADING ' until the DiscoverBlock contains data
    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" loading={loading}/>
      </div>
    );
  }
}