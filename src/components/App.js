import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Navigation from './Navigation';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';


class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/new" component={PostForm} />
          <Route exact path="/:postId" component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

export default App;
