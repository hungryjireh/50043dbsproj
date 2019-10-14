import axios from "axios";


import { SEARCH_BOOKS, GET_BOOK_DETAIL, GET_ERRORS, SET_BOOK_DETAIL } from "./types";

// TODO

export const searchBooks = (searchStr) => dispatch => {
    axios
      .get(`/api/store/search?search=${searchStr}`)
      .then(res => 
        dispatch({
            type: SEARCH_BOOKS,
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

  export const getBookDetail = (bookID) => dispatch => {
    axios
      .get(`/api/store/book/${bookID}`)
      .then(res => 
        dispatch({
            type: SET_BOOK_DETAIL,
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