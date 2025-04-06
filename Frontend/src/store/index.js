import { configureStore } from '@reduxjs/toolkit';
//import counterReducer from '../features/counter/counterSlice'; // example slice
import  messageReducer from "./messageSlice"
export const store = configureStore({
  reducer: {
    messages:messageReducer,
  },
});
