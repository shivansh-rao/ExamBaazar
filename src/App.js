import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home.js'
import Questions from './Components/Questions.js'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/questions/:id" component={Questions}/>
        </Switch>
      </header>
    </div>
    </Router>
  );
}

export default App;
