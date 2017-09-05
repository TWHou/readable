import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';  
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';
import FaPencil from 'react-icons/lib/fa/pencil';  
import FaTrashO from 'react-icons/lib/fa/trash-o'; 
import { Modal } from 'reactstrap';
import Moment from 'react-moment';

import CommentForm from './CommentForm';
import { voteCommentAPI } from '../actions/commentActions';

class Comment extends Component {

  state = {
    edit: false,    
  }

  toggle = () => {
    this.setState({
      edit: !this.state.edit
    });
  }

  handleVote = (vote) => {
    this.props.voteComment(this.props.comment.id, vote);
  }

  render() {
    const { comment } = this.props;
    return (
      <div>
        <p>{comment.author} (<Moment fromNow className="text-muted">{comment.timestamp}</Moment>) said: {comment.body}</p>
        <footer className="comment-footer">
          <FaThumbsOUp onClick={() => this.handleVote('upVote')} />
          <span className="m-3">{comment.voteScore}</span>
          <FaThumbsODown onClick={() => this.handleVote('downVote')} />
          <FaPencil className="m-3" onClick={this.toggle} />
          <FaTrashO />
        </footer>
        <Modal isOpen={this.state.edit} toggle={this.toggle}>
          <CommentForm edit comment={this.props.comment} onClose={this.toggle} />
        </Modal>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  voteComment: PropTypes.func
};

export default connect(
  null,
  { 
    voteComment: voteCommentAPI,
  }
)(Comment);