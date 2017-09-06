import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardText, CardBlock, CardTitle, CardSubtitle } from 'reactstrap';
import { Link } from 'react-router-dom';

class Post extends Component {
  
  render() {
    const { post } = this.props;
    return (
      <Card key={post.id}>
        <CardBlock>
          <CardTitle>
            <Link to={`/${post.category}/${post.id}`}>
              {post.title}
            </Link>
          </CardTitle>
          <CardSubtitle>{post.author}</CardSubtitle>
          <CardText>
            {post.body}
          </CardText>
        </CardBlock>
      </Card>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;