import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AppMenu from './AppMenu.js';
import Login from './stateful/Login.js';
import Profile from './stateful/Profile.js';
import SearchTable from './stateful/SearchTable.js';
import CreateRecipe from './stateful/CreateRecipe.js';

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  const history = createBrowserHistory()
  const token = localStorage.getItem("user_token")

  useEffect(() => {
    if(token) {
      fetch("http://localhost:3030/api/v1/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          localStorage.removeItem("user_token")
          alert(data.errors)
        }else {
          setCurrentUser(data)
        }
      })
    }
  }, [token])


  return (
    <Router>
      <AppMenu currentUser={currentUser} setCurrentUser={setCurrentUser} history={history}/>
      <Switch>
        <Route path='/login'>
          {currentUser ?
            <Redirect to='/'/> 
          :
            <Login setCurrentUser={setCurrentUser} history={history}/>
          }
        </Route>
        <Route exact path='/'>
          {currentUser ?
            <Profile currentUser={currentUser}/> 
          :
            <Redirect to='/login'/>
          }
        </Route>
        <Route path='/search'>
          <SearchTable currentUser={currentUser}/>
        </Route>
        <Route path='/create-recipe'>
          <CreateRecipe currentUser={currentUser}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
