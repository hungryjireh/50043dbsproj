import axios from "axios";


import { SET_REVIEW, SET_BOOK_REVIEWS, SET_USER_REVIEWS, GET_ERRORS } from "./types";

//TODO

export const getBookReviews = (bookID) => dispatch => {
    axios
      .get(`/api/review/book/${bookID}`)
      .then(res => 
        dispatch({
            type: SET_BOOK_REVIEWS,
            payload: res
        })
        )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const getUserReviews = (userID) => dispatch => {
    axios
      .get(`/api/review//user/${userID}`)
      .then(res => 
        dispatch({
            type: SET_USER_REVIEWS,
            payload: res
        })
        )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };