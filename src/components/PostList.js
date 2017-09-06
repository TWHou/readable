import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPostsAPI } from '../actions/postActions';
import Post from './Post';
  
class PostList extends Component {

  componentDidMount() {
    if (this.props.match.params.category) {
      this.props.getPosts(this.props.match.params.category);
    } else {
      this.props.getPosts();
    }
  }
  
  render() {
    return (
      <div>
        {
          this.props.posts.map((post) => 
            <Post key={post.id} post={post}/>
          )
        }
      </div>
    );
  }
}

PostList.propTypes = {
  match: PropTypes.object,  
  getPosts: PropTypes.func,
  posts: PropTypes.array
};

const mapStateToProps = ({ post }) => {
  if (post.posts) {
    return {
      posts: Object.keys(post.posts).map((postId) => post.posts[postId]).filter((post) => post)
    };
  } else {
    return {
      posts: []
    };
  }
};

export default connect(
  mapStateToProps,
  { 
    getPosts: getPostsAPI
  }
)(PostList);