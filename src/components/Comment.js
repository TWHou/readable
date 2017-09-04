import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FaThumbsOUp from 'react-icons/lib/fa/thumbs-o-up';  
import FaThumbsODown from 'react-icons/lib/fa/thumbs-o-down';  
import Moment from 'react-moment';

import { voteCommentAPI } from '../actions/commentActions';

class Comment extends Component {

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
          <span className="score">{comment.voteScore}</span>
          <FaThumbsODown onClick={() => this.handleVote('downVote')} />
        </footer>
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