import axios from 'axios';

const root = 'http://localhost:5001';

// https://gist.github.com/jed/982883
const uuidv4 = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);

const generateToken = () => Math.random().toString(36).substr(-8);

const token = localStorage.getItem('token') || generateToken();

axios.defaults.headers.common['Authorization'] = token;

const api = {};

// GET /categories
// USAGE:
// Get all of the categories available for the app. List is found in categories.js. Feel free to extend this list as you desire.

api.getCategories = () => axios.get(`${root}/categories`)
.then((res) => res.data)
.then((categories) => categories.map((category) => category.name));

// GET /:category/posts
// USAGE:
// Get all of the posts for a particular category

api.getCategoryPosts = (category) => axios.get(`${root}/${category}/posts`)
.then((res) => res.data);

// GET /posts
// USAGE:
// Get all of the posts. Useful for the main page when no category is selected.

api.getPosts = () => axios.get(`${root}/posts`)
.then((res) => res.data);

// POST /posts
// USAGE:
// Add a new post

api.addPost = (post) => {
  const id = uuidv4();
  const timestamp = Date().now;
  post = { ...post, id, timestamp };
  return axios.post(`${root}/posts`, post)
  .then((res) => res.data);
};

// PARAMS:
// id - UUID should be fine, but any unique id will work
// timestamp - timestamp in whatever format you like, you can use Date.now() if you like
// title - String
// body - String
// owner - String
// category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

// GET /posts/:id
// USAGE:
// Get the details of a single post

// POST /posts/:id
// USAGE:
// Used for voting on a post

api.votePost = (id, vote) => axios.post(`${root}/posts/${id}`, {option: vote})
.then((res) => res.data);

// PARAMS:
// option - String: Either "upVote" or "downVote"

// PUT /posts/:id
// USAGE:
// Edit the details of an existing post

api.editPost = (id, post) => axios.put(`${root}/posts/${id}`, post)
.then((res) => res.data);

// PARAMS:
// title - String
// body - String

// DELETE /posts/:id
// USAGE:
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.

api.deletePost = (id) => axios.delete(`${root}/posts/${id}`)
.then((res) => res.data);

// GET /posts/:id/comments
// USAGE:
// Get all the comments for a single post

api.getComments = (id) => axios.get(`${root}/posts/${id}/comments`)
.then((res) => res.data);

// POST /comments
// USAGE:
// Add a comment to a post

api.addComment = (comment) => {
  const id = uuidv4();
  const timestamp = Date().now;
  comment = { ...comment, id, timestamp };
  return axios.post(`${root}/comments`, comment)
  .then((res) => res.data);
};

// PARAMS:
// id: Any unique ID. As with posts, UUID is probably the best here.
// timestamp: timestamp. Get this however you want.
// body: String
// owner: String
// parentId: Should match a post id in the database.

// GET /comments/:id
// USAGE:
// Get the details for a single comment

// POST /comments/:id
// USAGE:
// Used for voting on a comment.

api.voteComment = (id, vote) => axios.post(
  `${root}/comments/${id}`,
  { option: vote }
).then((res) => res.data);

// PUT /comments/:id
// USAGE:
// Edit the details of an existing comment

api.editComment = (id, comment) => axios.put(
  `${root}/comments/${id}`,
  comment
).then((res) => res.data);

// PARAMS:
// timestamp: timestamp. Get this however you want.
// body: String

// DELETE /comments/:id
// USAGE:
// Sets a comment's deleted flag to 'true' 

api.deleteComment = (id) => axios.delete(`${root}/comments/${id}`)
.then((res) => res.data);

export default api;
