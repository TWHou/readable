import api from '../utils/api';

const RECEIVE_COMMENTS = 'GET_COMMENTS';
const ADD_COMMENT = 'ADD_COMMENT';
const VOTE_COMMENT = 'VOTE_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';

//Sets a comment's deleted flag to 'true'
const DELETE_COMMENT = 'DELETE_COMMENT';

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments
});

export const getCommentsAPI = (parentId) => (dispatch) => {
  api.getComments(parentId).then(
    (comments) => dispatch(receiveComments(comments))
  );
};

export const getCommentAPI = (id) => (dispatch) => {
  api.getComment(id).then(
    (comment) => dispatch(receiveComments(comment))
  );
};

const addComment = ({ id, timestamp, body, owner, parentId }) => ({
  type: ADD_COMMENT,
  id,
  timestamp,
  body,
  owner,
  parentId
});

export const postCommentAPI = (comment) => (dispatch) => {
  api.postComment(comment).then(
    (comment) => dispatch(addComment(comment))
  );
};

const voteComment = ({ id, vote }) => ({
  type: VOTE_COMMENT,
  id,
  vote
});

export const voteCommentAPI = (id, vote) => (dispatch) => {
  api.voteComment(id, vote).then(
    (comment) => dispatch(voteComment(comment))
  );
};

const editComment = ({ id, body }) => ({
  type: EDIT_COMMENT,
  id,
  body
});

export const editCommentAPI = (id, comment) => (dispatch) => {
  api.editComment(id, comment).then(
    (comment) => dispatch(editComment(comment))
  );
};

const deleteComment = ({ id }) => ({
  type: DELETE_COMMENT,
  id
});

export const deleteCommentAPI = (id) => (dispatch) => {
  api.deleteComment(id).then(
    (comment) => dispatch(deleteComment(comment))
  );
};