 import React, { Component } from 'react';
 import albumData from './../data/albums';


 class Album extends Component {
   constructor(props) {
   super(props);


   //We want to set an album property on our state,
   //but first we'll need to find the album object in
   //albumData that    that has a slug property that's
   //equal to  this.props.match.params.slug, the route param.
   //JavaScript's .find() array method
   // is the perfect method for the job.

   const album = albumData.find( album => { //the second "album" here is referring to what?
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      //we'll want to display song data on the screen so
      //we'll want to store it on the component's state.
      currentSong: album.songs[0],
      //want to display whether or not the song is playing.
      isPlaying: false
    };
    // we're not assigning audioElement to the component's state.
    this.audioElement = document.createElement('audio');
    //when playing an album, we expect playback to start on the first
    //track, so let's set the src property of this.audioElement to
    //the audio source of the first song on the album.
    this.audioElement.src = album.songs[0].audioSrc;
   }

   play() {
     this.audioElement.play();
     this.setState({ isPlaying: true });
   }

   pause() {
     this.audioElement.pause();
     this.setState({ isPlaying: false });
   }

   //The setSong() method should receive a song object
   // as a parameter and update this.audioElement.src and this.state.currentSong.
   setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;
     //add an if statement that pauses the song if
     //this.state.isPlaying and  isSameSong are both true.
     if (this.state.isPlaying && isSameSong) {
       this.pause();
     } else {
       //the audio file never won't, unless we call
       // setSong() from handleSongClick()
       if (!isSameSong) { this.setSong(song); }
      this.play();
     }
   }

   render() {
     return (
       <section className="album">
       <section id="album-info">
       <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
        <div className="album-details">
           <h1 id="album-title">{this.state.album.title}</h1>
           <h2 className="artist">{this.state.album.artist}</h2>
        <div id="release-info">{this.state.album.releaseInfo}</div>
       </div>
     </section>
     <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map( (song, index) =>
            // <tr> {index+1} {song.title} {song.duration} seconds</tr> (to be discussed)
            <tr className="song" key={index+1} onClick={() => this.handleSongClick(song)}> {index+1} {song.title} {song.duration} seconds</tr>
            )
          }
          </tbody>
        </table>
       </section>
     );
   }
 }

export default Album;
