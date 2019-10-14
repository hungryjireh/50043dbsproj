import { SET_BOOK_DETAIL, SET_BOOK_REVIEWS, SET_USER_REVIEWS } from "../actions/types";

const initialState = {
  reviewDetail: null,
  bookReviews: [],
  userReviews: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_BOOK_DETAIL:
      return {
        ...state,
        reviewDetail: action.payload
      };
    case SET_BOOK_REVIEWS:
      return {
        ...state,
        bookReviews: action.payload
      };
    case SET_USER_REVIEWS:
    return {
        ...state,
        userReviews: action.payload
    };
    default:
      return state;
  }
}