import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBlock, ListGroup, ListGroupItem } from 'reactstrap';

import { getPostAPI } from '../actions/postActions';
import { getCommentsAPI } from '../actions/commentActions';
import Post from './Post';
import Comment from './Comment';
import CommentForm from './CommentForm';

class PostDetail extends Component {

  handleDelete = () => {
    this.props.history.push('/');
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
    this.props.getComments(this.props.match.params.postId);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {post && (
          <Post post={post} onDelete={this.handleDelete} />
        )}
        {post && (
          <div className="my-3 p-4 h3">
            {post.body}
          </div>
        )}
        <Card>
          <ListGroup className="list-group-flush">
          {
            this.props.comments.map((comment) =>
            <ListGroupItem key={comment.id}>
              <Comment comment={comment} />
            </ListGroupItem>
            )
          }
          </ListGroup>
          <CardHeader>Add a Comment</CardHeader>
          <CardBlock>
            <CommentForm parentId={this.props.match.params.postId} />
          </CardBlock>
        </Card>
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  getPost: PropTypes.func,
  getComments: PropTypes.func,
  match: PropTypes.object,
  history: PropTypes.object,
  comments: PropTypes.array
};

PostDetail.defaultProps = {
  comments: []
};

const mapStateToProps = ({ post, comment }) => {
  let props = {};
  if (post.posts) {
    props.post = post.posts[Object.keys(post.posts)[0]];
  }
  if (comment.comments) {
    props.comments = Object.keys(comment.comments).map((commentId) => comment.comments[commentId]).filter((comment) => comment);
  }
  return props;
};

export default connect(
  mapStateToProps,
  { 
    getPost: getPostAPI,
    getComments: getCommentsAPI,
  }
)(PostDetail);
