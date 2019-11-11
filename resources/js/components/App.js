import React from 'react';
import ReactDOM from 'react-dom';
import Header from './items/Header.js'
import About from './about/About.js'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  function Home() {
    return <h2>Home</h2>;
  }
   
  

  
function App() {
    return (
        <>
            <Router>
                <Header/>
                <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
