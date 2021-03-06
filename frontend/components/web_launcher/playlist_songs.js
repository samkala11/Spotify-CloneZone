import React from 'react';
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom';

class PlaylistSongs extends React.Component{
    constructor(props){
        super(props);
        this.handleHoverSong = this.handleHoverSong.bind(this);
        this.handleHoverOutSong = this.handleHoverOutSong.bind(this);
        this.getPlaylistImageUrl = this.getPlaylistImageUrl.bind(this);
        this.deletePlaylist = this.deletePlaylist.bind(this);
        this.displayDeleteButton = this.displayDeleteButton.bind(this);
        this.deleteSong = this.deleteSong.bind(this);
        this.state = {
            songs: [],
            imageUrl: "",
            displayDeleteButton: false,
        }
    }

    
    componentDidMount(){
        this.props.zeroSongsAlbum();
        this.props.zeroSongsArtist();
        let playlistId = this.props.match.params.playlistId
        this.props.getCurrentPlaylist(playlistId);
        this.props.getPlaylistSongs(playlistId)
        .then(() => this.setState({songs: Object.values(this.props.songs)}))
        .then(() => this.getPlaylistImageUrl())
    }

    componentDidUpdate(prevProps) {
        if (
        (prevProps.match.params.playlistId != this.props.match.params.playlistId)
        ) {
        let playlistId = this.props.match.params.playlistId
        this.setState({ songs: [{   }]  });
        this.props.getCurrentPlaylist(playlistId);
        this.props.getPlaylistSongs(playlistId)
        .then(() => this.setState({songs: Object.values(this.props.songs)}))
        .then(() => this.getPlaylistImageUrl())
        }
    }

    displayDeleteButton(){
        if (this.state.displayDeleteButton === false){
            this.setState({ displayDeleteButton: true})
        } else {
            this.setState({ displayDeleteButton: false})
        }
    }

    getPlaylistImageUrl(){
        if (this.state.songs.length > 1) {
            // debugger;
            this.setState({imageUrl: this.state.songs[0].songImageUrl})
        } else {
            this.setState({ imageUrl: "https://craftifybucket.s3.us-east-2.amazonaws.com/default-playlist.png" }) 
        }
    }

    handleHoverSong(song){
        let playButton = document.getElementById(song.id.toString())
        playButton.classList.remove("display-n")

        let musicNote = document.getElementsByClassName(song.id.toString())[0];
        musicNote.classList.add("display-n");

        let deleteButton = document.getElementById(`delete${song.id}`)
        deleteButton.classList.remove("display-n")
        // this.setState({deleteSongButton: true})
    }


    handleHoverOutSong(song){
        let playButton = document.getElementById(song.id.toString())
        playButton.classList.add("display-n")

        let musicNote = document.getElementsByClassName(song.id.toString())[0];
        musicNote.classList.remove("display-n");

        let deleteButton = document.getElementById(`delete${song.id}`)
        deleteButton.classList.add("display-n")
        // this.setState({deleteSongButton: false})

    }

    deletePlaylist() {
        let playlistId = this.props.match.params.playlistId

        let confirmation = confirm('Are you sure you want to delete this playlist?')

        if (confirmation) {
            this.props.deletePlaylistById(playlistId)
            .then(() => this.props.history.push('/weblauncher/library'))
        }
    }

    deleteSong(id) {
        let playlistId = this.props.match.params.playlistId
        let confirmation = confirm('Are you sure you want to delete this song?')

        if (confirmation) {

        this.props.deletePlaylistSong(id)
        .then(() => this.props.getPlaylistSongs(playlistId))
        .then(() => this.setState({songs: Object.values(this.props.songs)}))
        .then(() => this.getPlaylistImageUrl())
        }   
    }

    displaySongs(){
            if (this.state.songs.length === 1) {
                return null
            } else if (this.state.songs.length > 1 ) {
                let songs = this.state.songs.slice(0,this.state.songs.length - 1)
        return (
            <ul className="each-song-result-5">
            {songs.map(song =>
            <li onMouseEnter={() => this.handleHoverSong(song)} 
                onMouseLeave= {() => this.handleHoverOutSong(song)} 
                id="each-song-result-4" 
                className={"each-song-res" + song.id} >
                
                <i onClick={() => { this.playSongios(song) }} id={song.id} className="icon ion-md-play display-n"></i>

                <img className= {"music-note" + " " +  song.id} src="https://craftifybucket.s3.us-east-2.amazonaws.com/music_note.png"/>
                
                <div className="song-info-2">

                <div className="song-title-2">  {song.title}      </div>

                
                </div>

                {  <span id={"delete"+song.id} onClick={() => this.deleteSong(song.playlistSongId[0].id)} 
                className="remove-from-playlist display-n"> x </span> }

            </li>)}
        </ul> 
        ) }
    }


    playSongios(song) {
    
       let songGet= document.getElementsByClassName('audio-footer')[0];
        songGet.autoplay = true;
        songGet.play();
    
        let playbutton = document.getElementsByClassName("play-button")[0];
    
        if (playbutton.src === "https://craftifybucket.s3.us-east-2.amazonaws.com/play_white.png") {   
        playbutton.src = "https://craftifybucket.s3.us-east-2.amazonaws.com/pause_white.png"
        } else if (playbutton.src === "https://craftifybucket.s3.us-east-2.amazonaws.com/pause_white.png") {
        document.getElementsByClassName('audio-footer')[0].pause();
        playbutton.src = "https://craftifybucket.s3.us-east-2.amazonaws.com/play_white.png" 
        }
        
        this.props.receiveCurrentSong(song.id, song.songUrl, song.artist, song.title, song.songImageUrl)
      }


    render(){
        let songs = this.state.songs;
        window.showstate = this.state;
        
        return(
        <div className="playlist-show-cont">
            <div> 
                <div className="image-title-playlist"> 
                <img className="playlist-show-image" src={this.state.imageUrl}/>
                <br/>
                <h2> {this.props.currentPlaylist.name} </h2>
                </div>

                <div className="delete-cont"> 
                    <img onClick={this.displayDeleteButton}
                    src="https://craftifybucket.s3.us-east-2.amazonaws.com/threedots.png"/>
                {this.state.displayDeleteButton &&  <div className="delete-button"> 
                    <p onClick={this.deletePlaylist} > Delete </p>
                    </div> }
                </div>
            </div>

            {this.displaySongs()}
        </div>
            )
    }



}

export default withRouter(PlaylistSongs)