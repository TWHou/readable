import api from '../utils/api';

const RECEIVE_POSTS = 'GET_CAT_POST';
const ADD_POST = 'ADD_POST';
const VOTE_POST = 'VOTE_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getCategoryPostsAPI = (category) => (dispatch) => {
  api.getCategoryPosts(category).then(
    (posts) => dispatch(receivePosts(posts))
  );
};

export const getPostsAPI = () => (dispatch) => {
  api.getPosts().then(
    (posts) => dispatch(receivePosts(posts))
  );
};

export const getPostAPI = (id) => (dispatch) => {
  api.getPost(id).then(
    (post) => dispatch(receivePosts(post))
  );
};

const addPost = ({ id, timestamp, title, body, owner, category }) => ({
  type: ADD_POST,
  id,
  timestamp,
  title,
  body,
  owner,
  category
});

export const postPostAPI = (post) => (dispatch) => {
  api.postPost(post).then(
    (post) => dispatch(addPost(post))
  );
};

const votePost = ({ id, vote }) => ({
  type: VOTE_POST,
  id,
  vote
});

export const postVoteAPI = (id, vote) => (dispatch) => {
  api.postVote(id, vote).then(
    (post) => dispatch(votePost(post))
  );
};

const editPost = ({ id, title, body, category }) => ({
  type: EDIT_POST,
  id,
  title,
  body,
  category
});

export const putPostAPI = (id, post) => (dispatch) => {
  api.putPost(id, post).then(
    (post) => dispatch(editPost(post))
  );
};

const deletePost = ({ id }) => ({
  type: DELETE_POST,
  id
});

export const deletePostAPI = (id) => (dispatch) => {
  api.deletePost(id).then(
    (post) => dispatch(deletePost(post))
  );
};