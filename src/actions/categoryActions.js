import api from '../utils/api';

const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
const SELECT_CATEGORY = 'SELECT_CATEGORY';

const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => (dispatch) => {
  api.getCategories().then(
    (categories) => dispatch(receiveCategories(categories))
  );
};

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category
});