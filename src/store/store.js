import {configureStore} from '@reduxjs/toolkit';
import companySlice from './copanyListSlice';
import userDetailSlice from './userDetailSlice';
import calculatorSlice from './calculatorSlice';
import partyModalSlice from './partyModalSlice';
import itemModalSlice from './itemModalSlice';


const store = configureStore({
  reducer:{
    companyListModal: companySlice,
    userDetail: userDetailSlice,
    calculator: calculatorSlice,
    partyModalSlice: partyModalSlice,
    itemModalSlice: itemModalSlice
  },
})


export default store;

