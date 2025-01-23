import {configureStore} from '@reduxjs/toolkit';
import companySlice from './copanyListSlice';
import userDetailSlice from './userDetailSlice';
import calculatorSlice from './calculatorSlice';

const store = configureStore({
  reducer:{
    companyListModal: companySlice,
    userDetail: userDetailSlice,
    calculator: calculatorSlice,
  },
})


export default store;

