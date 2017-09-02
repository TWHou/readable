import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardBlock,
  CardTitle, CardSubtitle, Button, ListGroup, ListGroupItem, ListGroupItemHeading } from 'reactstrap';

import { getCommentsAPI } from '../actions/commentActions';
import CommentForm from './CommentForm';
  
class PostDetail extends Component {

  componentDidMount() {
    this.props.getComments(this.props.match.params.postId);
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
              <CardSubtitle>{post.author}</CardSubtitle>
              <CardText>{post.body}</CardText>
              <Button>Button</Button>
            </CardBlock>
            <ListGroup className="list-group-flush">
              {
                this.props.comments.map((comment) =>
                  <ListGroupItem key={comment.id}>
                    <p>{comment.body} --{comment.author}</p>
                  </ListGroupItem>
                )
              }
              <ListGroupItem>
                <ListGroupItemHeading>Add a Comment</ListGroupItemHeading>
                <CommentForm parentId={this.props.match.params.postId} />
              </ListGroupItem>
            </ListGroup>
          </Card>
        )}
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  getComments: PropTypes.func,
  match: PropTypes.object,
  comments: PropTypes.array
};

PostDetail.defaultProps = {
  comments: []
};

const mapStateToProps = ({ post, comment }, { match }) => {
  let props = {};
  if (post.posts) {
    props.post = post.posts[match.params.postId];
  }
  if (comment.comments) {
    props.comments = Object.keys(comment.comments).map((commentId) => comment.comments[commentId]);
  }
  return props;
};

export default connect(
  mapStateToProps,
  { 
    getComments: getCommentsAPI
  }
)(PostDetail);
