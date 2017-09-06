import api from '../utils/api';

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';

const receiveCategories = (categories) => ({
    type: RECEIVE_CATEGORIES,
    categories
});

export const getCategories = () => (dispatch) => {
  api.getCategories().then(
    (categories) => dispatch(receiveCategories(categories))
  );
};
