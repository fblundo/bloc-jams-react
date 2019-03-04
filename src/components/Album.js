import React, { Component } from 'react';
 import albumData from './../data/albums';
 import PlayerBar from './PlayerBar';


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
      isPlaying: false,
      isPaused: false,
      volume: 0.80,
      songHover: album.songs[0],
      currentTime: 0,
      duration: album.songs[0].duration,
      mouseOverStatus: false
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
     this.setState({ isPaused: true });
   }

   componentDidMount() {
     this.eventListeners = {
       timeupdate: e => {
         //please confirm: we are accessing the currentTime pre-defined property, which tracks the real time value of the song as it plays in this point of the code
         this.setState({ currentTime: this.audioElement.currentTime });
       },
       durationchange: e => {
         this.setState({ duration: this.audioElement.duration });
       },
       volumechange: e => {
         this.setState({ volume: this.audioElement.volume });
       }
     };
     this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.addEventListener('volumechange', this.eventListeners.volumechange);
   }

   componentWillUnmount() {
     this.audioElement.src = null;
     this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
     this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
     this.audioElement.removeEventListener('volumechange', this.eventListeners.volumechange);
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

   handlePrevClick() {
     const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
     const newIndex = Math.max(0, currentIndex - 1);
     const newSong = this.state.album.songs[newIndex];
     this.setSong(newSong);
     this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
 }

 handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });

  }

  handleVolumeIncrease() {
    var currentVolume = this.state.volume;
    if (currentVolume >= 0.99) {
        var increasedVolume = 1 }
        else
        {
        increasedVolume =  Math.max(0, currentVolume + 0.01).toFixed(2);
    }
    this.audioElement.volume = increasedVolume;
    this.setState({ volume: increasedVolume });
    }

    handleVolumeDecrease() {
      var currentVolume = this.state.volume;
      if (currentVolume <= 0.1) {
          var decreasedVolume = 0 }
          else
          {
          decreasedVolume =  Math.max(0, currentVolume - 0.01).toFixed(2);
      }
      this.audioElement.volume = decreasedVolume;
      this.setState({ volume: decreasedVolume });
      }


   handleSongHover(song){
     this.setState({ songHover: song });
   }

   handleSongEnter(song) {
     this.setState({mouseOverStatus: true})
   }

   handleSongLeave(song) {
     this.setState({mouseOverStatus: false})
   }

   manageIcon(song, index) {
     if (this.state.isPlaying && this.state.currentSong === song) {
        return (<ion-icon name='pause'></ion-icon>)
        }
     else if (this.state.songHover == song && this.state.mouseOverStatus) {
       return (<ion-icon name='play'></ion-icon>)
     } else if (this.state.isPaused && this.state.currentSong === song)
     {return (<ion-icon name='play'></ion-icon>) }
     else { return index+1
     }
   }

   formatTime(duration) {
    var d = Number(duration);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " " : ":") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? ":" : ":") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "" : " ") : "";
    return hDisplay + mDisplay + sDisplay;
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
            this.state.album.songs.map( (song, index) => // song is the item in the array, but no need to define it as a variable
            // <tr> {index+1} {song.title} {song.duration} seconds</tr> (to be discussed importance of keys in react)
            <tr className="song" key={index+1}
                 onClick={() => this.handleSongClick(song)}
                 onMouseOver={() => this.handleSongHover(song)}
                 onMouseEnter={() => this.handleSongEnter(song)}
                 onMouseLeave={() => this.handleSongLeave(song)}>
            <td onClick={() => this.manageIcon(song)}>
            {this.manageIcon(song, index)}
            </td>
            <td> {song.title} </td>
            <td> {this.formatTime(song.duration)} </td>

            </tr>
            )
          }
          </tbody>
        </table>
         <PlayerBar
         //The play data is contained in Album state, but we'll need to access it in PlayerBar, so pass down isPlaying and currentSong to PlayerBar as props.
         isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         //passing time and duration as props to player bar
         currentTime={this.audioElement.currentTime}
         duration={this.audioElement.duration}
         formatTime={this.formatTime}
         //passing the volume data as props to player bar
         volume={this.state.volume}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         handleNextClick={() => this.handleNextClick()}
         handleTimeChange={(e) => this.handleTimeChange(e)}
         handleVolumeChange={(e) => this.handleVolumeChange(e)}
         increaseVolume={() => this.handleVolumeIncrease()}
         decreaseVolume={() => this.handleVolumeDecrease()}
         />
       </section>
     );
   }
 }

export default Album;


//When I hover over a song, it displays a "play" button in place of the song number.
//The currently playing song displays a "pause" button in place of the song number.
//A paused song displays a "play" button in place of the song number.
