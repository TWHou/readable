import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

class NoPost extends Component {

  componentDidMount() {
    setTimeout(() => this.props.history.replace('/'), 10000);
  }
  
  render() {
    return (
      <Alert color="danger" className="my-3 text-center">  
        <p><strong>Hmm.... I cannot find that post.</strong></p>
        <Link to="/" replace className="btn btn-block btn-secondary">Take me back to homepage</Link>
      </Alert>
    );
  }
}

NoPost.propTypes = {
  history: PropTypes.object
};

export default NoPost;