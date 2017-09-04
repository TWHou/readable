import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardBlock,
  CardTitle, CardSubtitle, CardFooter, Button, ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';  
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';  
import Moment from 'react-moment';

import { votePostAPI } from '../actions/postActions';
import { getCommentsAPI } from '../actions/commentActions';
import Comment from './Comment';
import CommentForm from './CommentForm';
  
class PostDetail extends Component {

  componentDidMount() {
    this.props.getComments(this.props.match.params.postId);
  }

  handleVote = (vote) => {
    this.props.votePost(this.props.match.params.postId, vote);
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        {post && (
          <Card>
            <CardHeader>{post.category}</CardHeader>
            <CardBlock>
              <CardTitle>{post.title}</CardTitle>
              <CardSubtitle>
                {post.author} posted <Moment fromNow>{post.timestamp}</Moment>
              </CardSubtitle>
            </CardBlock>
            <CardBlock>
              <CardText className="lead">{post.body}</CardText>
            </CardBlock>
            <CardFooter className="d-flex justify-content-between">
              <span>Score: {post.voteScore}</span>
              <ButtonGroup size="sm">
                <Button onClick={() => this.handleVote('upVote')}><FaThumbsOUp /></Button>
                <Button onClick={() => this.handleVote('downVote')}><FaThumbsODown /></Button>
              </ButtonGroup>
            </CardFooter>
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
        )}
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  votePost: PropTypes.func,
  getComments: PropTypes.func,
  match: PropTypes.object,
  comments: PropTypes.array
};

PostDetail.defaultProps = {
  comments: []
};

const mapStateToProps = ({ post, comment }, { match }) => {
  let props = {};
  if (post.posts) {
    props.post = post.posts[match.params.postId];
  }
  if (comment.comments) {
    props.comments = Object.keys(comment.comments).map((commentId) => comment.comments[commentId]);
  }
  return props;
};

export default connect(
  mapStateToProps,
  { 
    votePost: votePostAPI,
    getComments: getCommentsAPI
  }
)(PostDetail);
