import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import userReducer from '../../redux/slices/userSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: userReducer,
  // Add more reducers here
});

export default rootReducer;
