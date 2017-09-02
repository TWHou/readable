import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { addCommentAPI } from '../actions/commentActions';

class CommentForm extends Component {

  state = {
    author: '',
    body: '',
    hasError: false
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  validateForm = () => {
    const { author, body } = this.state;
    return (author !== '' &&  body !== '');
  }

  handleReset = () => {
    this.setState({
      author: '',
      body: '',
      hasError: false
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validateForm()) {
      let { hasError, ...comment } = this.state;
      comment.parentId = this.props.parentId;
      this.props.addComment(comment);
      this.handleReset();
    } else {
      this.setState({
        hasError: true
      });
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="w-100">
        {this.state.hasError && (
          <Alert color="danger">
            <strong>Oops!</strong> All fields are required to add a comment.
          </Alert>
        )}
        <FormGroup row>
          <Label for="author" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="text" name="author" id="author" placeholder="Name" value={this.state.author} onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="body" sm={2}>Comment</Label>
          <Col sm={10}>
            <Input type="textarea" name="body" id="body" value={this.state.body} onChange={this.handleChange} placeholder="Your Comment"/>
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

CommentForm.propTypes = {
  parentId: PropTypes.string.isRequired,
  addComment: PropTypes.func
};

export default connect(
  null,
  { 
    addComment: addCommentAPI
  }
)(CommentForm);