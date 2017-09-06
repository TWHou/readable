import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { getCategories } from '../actions/categoryActions';
import { getPostsAPI } from '../actions/postActions';
import Navigation from './Navigation';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';


class App extends Component {

  componentDidMount() {
    this.props.getCategories();
    // this.props.getPosts();
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/new" component={PostForm} />
          <Route exact path="/:category" component={PostList} />
          <Route path="/:category/:postId" component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func,
  getPosts: PropTypes.func,
};

export default  withRouter(connect(
  null,
  {
    getCategories: getCategories,
    getPosts: getPostsAPI
  }
)(App));