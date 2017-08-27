import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import { getCategories } from '../actions/categoryActions';
import Navigation from './Navigation';
import PostList from './PostList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';


class App extends Component {

  componentDidMount() {
    this.props.getCategories();
  }

  render() {
    return (
      <div className="container">
        <Navigation />
        <Switch>
          <Route exact path="/" component={PostList} />
          <Route exact path="/new" component={PostForm} />
          <Route path="/:postId" component={PostDetail} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  getCategories: PropTypes.func,
};

export default connect(
  null,
  { getCategories: getCategories }
)(App);