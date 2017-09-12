import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NoPost extends Component {

  componentDidMount() {
    setTimeout(() => this.props.history.push('/'), 10000);
  }
  
  render() {
    return (
      <div>  
        Hmm.... I cannot find that post. Redirecting to homepage in 10s......
      </div>
    );
  }
}

NoPost.propTypes = {
  history: PropTypes.func
};

export default NoPost;