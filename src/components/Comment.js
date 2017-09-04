import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <blockquote className="blockquote">
        <p>{comment.body}</p>
        <footer className="blockquote-footer">{comment.author}</footer>
      </blockquote>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default Comment;