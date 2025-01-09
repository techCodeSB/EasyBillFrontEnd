import {configureStore} from '@reduxjs/toolkit';
import companySlice from './copanyListSlice'

const store = configureStore({
  reducer:{
    companyListModal: companySlice
  },
})


export default store;

