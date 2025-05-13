import { combineReducers } from "redux";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
  products: productReducer,
  // other reducers...
});

export default rootReducer;
