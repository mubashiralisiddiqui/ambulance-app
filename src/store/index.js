// import { applyMiddleware, createStore, combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import AuthReducers from './reducers/authReducer';
// // import navReducer from './reducers/navReducers';
// export default createStore(
//     combineReducers({
//         AuthReducers,
//         // navReducer
//     }), {}, (applyMiddleware(thunk))
// )

import AuthReducers from "./reducers/authReducer";
import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";

export default createStore(
  combineReducers({
    AuthReducers
  }),
  {},
  applyMiddleware(thunk)
);
