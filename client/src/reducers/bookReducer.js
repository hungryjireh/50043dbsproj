import { SEARCH_BOOKS, SET_BOOK_DETAIL } from "../actions/types";

const initialState = {
  books: [],
  book_detail: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_BOOKS:
      return {
        ...state,
        books: action.payload
      };
    case SET_BOOK_DETAIL:
      return {
        ...state,
        book_detail: action.payload
      };
    default:
      return state;
  }
}