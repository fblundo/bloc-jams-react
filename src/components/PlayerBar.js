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
       <div className="current-time">{this.props.currentTime}</div>
         <input
           type="range"
           className="seek-bar"
           value={(this.props.currentTime / this.props.duration) || 0}
           max="1"
           min="0"
           step="0.01"
           onChange={this.props.handleTimeChange}
         />
         <div className="total-time">{this.props.duration}</div>
       </section>
       <section id="volume-control">
           <ion-icon name="icon ion-volume-low"></ion-icon>
         <input type="range" className="seek-bar" value="80" />
            <ion-icon name="icon ion-volume-high"></ion-icon>
       </section>
       </section>
     );
   }
 }

 export default PlayerBar;