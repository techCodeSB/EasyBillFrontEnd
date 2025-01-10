import {configureStore} from '@reduxjs/toolkit';
import companySlice from './copanyListSlice';
import userDetailSlice from './userDetailSlice';

const store = configureStore({
  reducer:{
    companyListModal: companySlice,
    userDetail: userDetailSlice
  },
})


export default store;

