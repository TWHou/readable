import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';

import { getPostsAPI, getCategoryPostsAPI } from '../actions/postActions';

class PostList extends Component {

  componentDidMount() {
    this.updatePosts();
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.selectedCategory !== this.props.selectedCategory) {
      this.updatePosts();
    }
  }
  

  updatePosts() {
    if (this.props.selectedCategory) {
      this.props.getCategoryPosts(this.props.selectedCategory);
    } else {
      this.props.getPosts();
    }
  }
  

  render() {
    return (
      <div>
        {
          this.props.posts.map((post) => 
            <Card key={post.id}>
              <CardBlock>
                <CardTitle>{post.title}</CardTitle>
                <CardSubtitle>{post.author}</CardSubtitle>
                <CardText>
                  {post.body}
                </CardText>
              </CardBlock>
            </Card>
          )
        }
      </div>
    );
  }
}

PostList.propTypes = {
  selectedCategory: PropTypes.string,
  getCategoryPosts: PropTypes.func,
  getPosts: PropTypes.func,
  posts: PropTypes.array
};

PostList.defaultProps = {
  posts: []
};

const mapStateToProps = ({ category, post }) => {
  if (post.posts) {
    return {
      ...category,
      posts: Object.keys(post.posts).map((postId) => post.posts[postId])
    };
  } else {
    return {
      ...category
    };
  }
};

export default connect(
  mapStateToProps,
  {
    getPosts: getPostsAPI,
    getCategoryPosts: getCategoryPostsAPI
  }
)(PostList);