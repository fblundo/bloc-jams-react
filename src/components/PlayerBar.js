import React, { Component } from 'react';

 class PlayerBar extends Component {
   render() {
     return (
       <section className="player-bar">
       <section id="buttons">
         <button id="previous" onClick={this.props.handlePrevClick}>
           <ion-icon name="skip-backward"></ion-icon>
         </button>
         <button id="play-pause" onClick={this.props.handleSongClick} >
          { /* //refactor the play/pause icon to reflect the state
           //of play. We can do this by putting a ternary operator
           //<span className="ion-play"></span>
           //<span className="ion-pause"></span> */}
           <ion-icon name={this.props.isPlaying ? 'pause' : 'play'}></ion-icon>
         </button>
         <button id="next" onClick={this.props.handleNextClick}>
           <ion-icon name="skip-forward"></ion-icon>
         </button>
       </section>
       <section id="time-control">
       <div className="current-time">{this.props.formatTime(this.props.currentTime)}</div>
       <input
           type="range"
           className="seek-bar"
           value={(this.props.currentTime / this.props.duration) || 0}
           max="1"
           min="0"
           step="0.01"
           onChange={this.props.handleTimeChange}
         />
         <div className="volume">{this.props.volume}</div>
       </section>
       <section id="volume-control">
           <ion-icon name="volume-low" onClick={this.props.decreaseVolume} ></ion-icon>
         <input type="range"
                className="seek-bar"
                max="1"
                min="0"
                step="0.01"
                value={(this.props.volume ) || 0}
                onChange={this.props.handleVolumeChange}
                />
        <ion-icon name="volume-high" onClick={this.props.increaseVolume}></ion-icon>
       </section>
       </section>
     );
   }
 }

 export default PlayerBar;
