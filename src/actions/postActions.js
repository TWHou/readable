import api from '../utils/api';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const ADD_POST = 'ADD_POST';
export const VOTE_POST = 'VOTE_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
});

export const getPostsAPI = (category) => (dispatch) => {
  if(category) {
    api.getCategoryPosts(category).then(
      (posts) => dispatch(receivePosts(posts))
    );
  } else {
    api.getPosts().then(
      (posts) => dispatch(receivePosts(posts))
    );
  }
};

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post
});

export const getPostAPI = (id) => (dispatch) => {
  api.getPost(id).then(
    (post) => dispatch(receivePost(post))
  );
};

const addPost = (post) => ({
  type: ADD_POST,
  post
});

export const addPostAPI = (post) => (dispatch) => {
  api.addPost(post).then(
    (post) => dispatch(addPost(post))
  );
};

const votePost = ({ id, vote }) => ({
  type: VOTE_POST,
  id,
  vote
});

export const votePostAPI = (id, vote) => (dispatch) => {
  api.votePost(id, vote).then(
    (post) => dispatch(votePost(post))
  );
};

const editPost = (post) => ({
  type: EDIT_POST,
  post
});

export const editPostAPI = (id, post) => (dispatch) => {
  api.editPost(id, post).then(
    (post) => dispatch(editPost(post))
  );
};

const deletePost = (post) => ({
  type: DELETE_POST,
  post
});

export const deletePostAPI = (id) => (dispatch) => {
  api.deletePost(id).then(
    (post) => dispatch(deletePost(post))
  );
};