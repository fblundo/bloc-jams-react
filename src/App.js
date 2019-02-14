import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'; // importing the Route and Link components to implement a basic router
import './App.css';
import Landing from './components/Landing'; //importing the component
import Library from './components/Library'; //importing the component
import Album from './components/Library'; //importing the component


class App extends Component {
  render() {
    return (
      <div className="App">
          <header>
          <nav>
             <Link to='/'>Landing</Link>
             <Link to='/library'>Library</Link>
           </nav>
           <h1>Bloc Jams</h1>
         </header>
         <main>
          <Route exact path="/" component={Landing} />  //creating a route for each page with corresponding path; we specify "exact path" because we only want the Landing component to render when the path is /,
          <Route path="/library" component={Library} /> //creating a route for each page with corresponding path
          <Route path="/album" component={Album} /> //creating a route for each page with corresponding path
         </main>
      </div>

    );
  }
}

export default App;
