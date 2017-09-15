import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

class NoPost extends Component {

  componentDidMount() {
    setTimeout(() => this.props.history.replace('/'), 10000);
  }
  
  render() {
    return (
      <Alert color="danger" className="my-3 text-center">  
        <p><strong>Hmm.... I cannot find that post.</strong></p>
        Redirecting to homepage in 10s......
      </Alert>
    );
  }
}

NoPost.propTypes = {
  history: PropTypes.object
};

export default NoPost;