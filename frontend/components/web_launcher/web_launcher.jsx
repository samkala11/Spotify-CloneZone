import React from 'react';
import { Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import SearchContainer from '../artists/artists_container'
import SideBar from '../sidebar_launcher/sidebar_launcher';
import SongPlayer from '../song_player/song_player';
import WebLauncherHomeContainer from './web_laucher_homecontainer';
import ArtistSongsContainer from "../artists/artist_songs_container"

class WebLauncher extends React.Component {

  constructor(props) {
    super(props)
  }


  render(){
   
    if (!this.props) return (<div> Loading </div>)

    return(
      <div className="main-weblauncher">
        <div className="flex-box-featured-andsidebar">  
          <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet"/>


          <SideBar />


          <div className="middle-home">
            
            <Route path="/weblauncher/search" component={SearchContainer} />

            <Route path="/weblauncher/home" component={WebLauncherHomeContainer}/>

            <Route path ="/weblauncher/:artistId/songs" component={ArtistSongsContainer}/>


          </div>

        </div> 

        <div className="song-player-foot">
          <SongPlayer songArtist={this.props.currentlyPlaying.artist} songTitle={this.props.currentlyPlaying.title} songUrl={this.props.currentlyPlaying.songUrl} 
          songImageUrl={this.props.currentlyPlaying.songImageUrl} />
        </div>

      </div>
    )
  }
}

export default WebLauncher;