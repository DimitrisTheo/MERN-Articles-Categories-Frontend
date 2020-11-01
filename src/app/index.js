import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from '../components/Navbar';
import ArticlesList from '../pages/ArticlesList';
import Home from '../pages/Home'

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/articles/list" component={ArticlesList}/>
          <Route exact path="/articles/list/:param" />
          <Route exact path="/articles/create" />
          <Route exact path="/articles/update/:id" />
          <Route exact path="/categories/list" />
          <Route exact path="/categories/create" />
        </Switch>
      </div>
    </Router>
  );
}



export default App;
