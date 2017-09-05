import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, CardText, CardBlock,
  CardTitle, CardSubtitle } from 'reactstrap';

class PostList extends Component {
  render() {
    return (
      <div>
        {
          this.props.posts.map((post) => 
            <Card key={post.id}>
              <CardBlock>
                <CardTitle>
                  <Link to={`/${post.id}`}>
                    {post.title}
                  </Link>
                </CardTitle>
                <CardSubtitle>{post.author}</CardSubtitle>
                <CardText>
                  {post.body}
                </CardText>
              </CardBlock>
            </Card>
          )
        }
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array
};

const mapStateToProps = ({ post }) => {
  if (post.posts) {
    return {
      posts: Object.keys(post.posts).map((postId) => post.posts[postId]).filter((post) => post)
    };
  } else {
    return {
      posts: []
    };
  }
};

export default connect(
  mapStateToProps,
  null
)(PostList);