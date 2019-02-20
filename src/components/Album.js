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
      album: album
    };

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
          </tbody>
        </table>
       </section>
     );
   }
 }

export default Album;
