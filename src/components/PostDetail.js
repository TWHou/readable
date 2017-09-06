import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardBlock,
  CardTitle, CardSubtitle, CardFooter, Button, ButtonGroup, ListGroup, ListGroupItem, Modal, Alert } from 'reactstrap';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';  
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';  
import FaPencil from 'react-icons/lib/fa/pencil';  
import FaTrashO from 'react-icons/lib/fa/trash-o';  
import Moment from 'react-moment';

import { getPostAPI, votePostAPI, deletePostAPI } from '../actions/postActions';
import { getCommentsAPI } from '../actions/commentActions';
import Comment from './Comment';
import PostForm from './PostForm';
import CommentForm from './CommentForm';
  
class PostDetail extends Component {

  state = {
    edit: false,
    delete: false 
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  toggleDelete = () => {
    this.setState({
      delete: !this.state.delete
    });
  }

  handleDelete = () => {
    this.props.deletePost(this.props.match.params.postId);
    this.props.history.push('/');
  }

  componentDidMount() {
    this.props.getPost(this.props.match.params.postId);
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
              <ButtonGroup size="sm">
                <Button onClick={this.toggleEdit}><FaPencil /></Button>
                <Button onClick={this.toggleDelete}><FaTrashO /></Button>
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
        <Modal isOpen={this.state.edit} toggle={this.toggleEdit}>
          <PostForm edit post={this.props.post} onClose={this.toggleEdit} />
        </Modal>
        <Modal isOpen={this.state.delete} toggle={this.toggleDelete}>
          <Alert color="danger" className="m-0">
            <strong>Are you Sure?</strong> This cannot be undone.<br />
            <Button color="danger" block onClick={this.handleDelete}>Delete this post</Button>
            <Button color="secondary" block onClick={this.toggleDelete}>I changed my mind.</Button>
          </Alert>
        </Modal>
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  votePost: PropTypes.func,
  deletePost: PropTypes.func,
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
  if (post.post) {
    props.post = post.post;
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
    votePost: votePostAPI,
    getComments: getCommentsAPI,
    deletePost: deletePostAPI
  }
)(PostDetail);
