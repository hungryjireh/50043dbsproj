import api from "../utils/api"


import { SET_REVIEW, SET_BOOK_REVIEWS, SET_USER_REVIEWS, GET_ERRORS } from "./types";

//TODO

export const getBookReviews = (bookID) => dispatch => {
    api
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
    api
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

  export const addNewReview = (review, user, bookID) => dispatch => {

    review["reviewerID"] = user.userID; //TODO add userID to User model
    review["reviewerName"] = user.name;
    review["unixReviewTime"] = Date.now()

    api
      .post(`/api/review/${bookID}`, review)
      .then(res => getBookReviews(bookID)) // TODO or SET_USER_REVIEW or histoy.push?
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const editReview = (review, reviewID) => dispatch => {

    review["unixReviewTime"] = Date.now()

    api
      .put(`/api/review/${reviewID}`, review)
      .then(res => getBookReviews(bookID)) // TODO or SET_USER_REVIEW or histoy.push?
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const deleteReview = (reviewID) => dispatch => {
    axios
      .delete(`/api/review/${reviewID}`)
      .then(res => getBookReviews(bookID)) // TODO or SET_USER_REVIEW or histoy.push?
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


  export const setReview = (review) => dispatch => {
    dispatch({
        type: SET_REVIEW,
        payload: review
      })
  }