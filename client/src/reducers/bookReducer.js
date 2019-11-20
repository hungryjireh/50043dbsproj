import { SEARCH_BOOKS } from "../actions/types";

const initialState = {
  books: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    default:
      return state;
  }
}