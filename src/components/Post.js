import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardText, CardBlock, CardTitle, Modal, Alert } from 'reactstrap';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';  
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaPencil from 'react-icons/lib/fa/pencil';  
import FaTrashO from 'react-icons/lib/fa/trash-o';  
import Moment from 'react-moment';

import { votePostAPI, deletePostAPI } from '../actions/postActions';
import PostForm from './PostForm';

class Post extends Component {
  
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
    this.props.deletePost(this.props.post.id);
    if (this.props.onDelete) {
      this.props.onDelete();
    }
  }
  
  handleVote = (vote) => {
    this.props.votePost(this.props.post.id, vote);
  }

  commentCount = () => {
    const comments = this.props.post.comments;
    if(comments > 1) {
      return `${comments} comments`;
    }
    if (comments === 0 || comments === 1) {
      return `${comments} comment`;
    }
  }

  render() {
    const { post } = this.props;
    return (
      <Card className="d-flex flex-row align-items-center">
        <div className="ml-2">
          <ButtonGroup vertical>
            <Button onClick={() => this.handleVote('upVote')}><FaThumbsOUp /></Button>
            <Button>{post.voteScore}</Button>
            <Button onClick={() => this.handleVote('downVote')}><FaThumbsODown /></Button>
          </ButtonGroup>
        </div>
        <CardBlock>
          <CardTitle>
            <Link to={`/${post.category}/${post.id}`}>
              {post.title}
            </Link>
          </CardTitle>
          <CardText>
            Posted by {post.author} <Moment className="text-muted">{post.timestamp}</Moment><br />
            {this.commentCount()}
          </CardText>
        </CardBlock>
        <div className="mr-2">
          <ButtonGroup vertical>
            <Button onClick={this.toggleEdit}><FaPencil /></Button>
            <Button onClick={this.toggleDelete}><FaTrashO /></Button>
          </ButtonGroup>
        </div>
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
      </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  votePost: PropTypes.func,
  deletePost: PropTypes.func,
  onDelete: PropTypes.func 
};

export default connect(
  null,
  { 
    votePost: votePostAPI,
    deletePost: deletePostAPI
  }
)(Post);