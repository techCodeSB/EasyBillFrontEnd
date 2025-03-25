import { createSlice } from "@reduxjs/toolkit";

const mailModalSlice = createSlice({
  name:"mailModal",
  initialState: {show: false, subject: '', body: ''},
  reducers:{
    toggle:(state, action)=>{
      state.show = action.payload;
    },

    setData: (state, action)=>{
        state.subject = action.payload.subject;
        state.body = action.payload.body;
    }
  }
})



export const {toggle, setData} = mailModalSlice.actions;
export default mailModalSlice.reducer;