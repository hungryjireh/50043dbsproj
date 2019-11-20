import api from "../utils/api"


import { SEARCH_BOOKS, GET_ERRORS, SET_BOOK_DETAIL } from "./types";

// TODO

export const searchBooks = (searchStr) => dispatch => {
    api
      .get(`/api/store/search?search=${searchStr}`)
      .then(res => 
        dispatch({
            type: SEARCH_BOOKS,
            payload: res.data.data
        })
        )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

  export const getBookDetail = (bookID) => dispatch => {
    api
      .get(`/api/store/book/${bookID}`)
      .then(res => 
        dispatch({
            type: SET_BOOK_DETAIL,
            payload: res.data.data
        })
        )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };