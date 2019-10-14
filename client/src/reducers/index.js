import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  reviews: reviewReducer,
});
