import {
  RECEIVE_POSTS,
  RECEIVE_POST,
  ADD_POST,
  VOTE_POST,
  EDIT_POST,
  DELETE_POST
} from '../actions/postActions';

const postReducer = (state={}, action) => {
  const { posts, post } = action;
  switch(action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts: posts.reduce((accu, curr) => {
          accu[curr.id] = curr;
          return accu;
        }, {})
      };
    case RECEIVE_POST:
      return {
        ...state,
        currentPost: post.id
      };
    case ADD_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };
    case VOTE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: {
            ...state.posts[action.id],
            voteScore: action.voteScore
          }
        }
      };
    case EDIT_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [post.id]: post
        }
      };
    case DELETE_POST:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.id]: null
        }
      };
    default:
      return state;
  }
};

export default postReducer;