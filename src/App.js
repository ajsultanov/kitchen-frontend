import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppMenu from './AppMenu.js';
import Login from './stateful/Login.js';
import Profile from './stateful/Profile.js';
import SearchTable from './stateful/SearchTable.js';
import CreateRecipe from './stateful/CreateRecipe.js';

function App() {

  return (
    <Router>
      <div className="App">
        <AppMenu/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/" component={Profile}/>
        <Route exact path="/search" component={SearchTable}/>
        <Route exact path="/create-recipe" render={routerProps => <CreateRecipe {...routerProps} movies={["Saw", "CTHD"]}/> }/>
      </div>
    </Router>
  );
}

export default App;
