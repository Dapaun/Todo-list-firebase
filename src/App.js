import React, { useState } from 'react';
import { auth } from './firebase';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Item from './itemList/Item';
import Login from './login/Login';
import SignUp from './signUp/signUp';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  auth.onAuthStateChanged(function(user) {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleSignOut = (e) => {
    e.preventDefault();
    auth.signOut();
  }

  document.body.style = 'background: #dbefdc;';
  return (
    <div>
       <div className="navBar">
        <p>Go Home</p>
        {isLoggedIn && <p onClick={handleSignOut}>Sign Out</p> }
      </div>
      <div className="App">
      <Router>
        <Route exact path="/itemlist">
          <Item/>
        </Route>
        <Route exact path="/login">
          <Login logged={isLoggedIn}/>
        </Route>
        <Route exact path="/signUp">
          <SignUp/>
        </Route>
        <Redirect exact from="/" to="/itemList" />
      </Router>
      </div>
    </div>
  );
}

export default App;
