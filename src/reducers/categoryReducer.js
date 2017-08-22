import {
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY
} from '../actions/categoryActions';

const categoryReducer = (state={}, action) => {
  const { categories, selectedCategory } = action;
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return {
        ...state,
        categories
      };
    case SELECT_CATEGORY:
      return {
        ...state,
        selectedCategory
      };
    default:
      return state;
  }
};

export default categoryReducer;