import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QuestionType, QuestionTypeSlice } from "../../types/questionsTypes";


const initialState: QuestionType = {
    text: '',
};

export const questionSlice = createSlice({
  name: 'question',
  initialState: initialState,
  reducers: {
    setQuestion: (state, action: PayloadAction<QuestionType['text']>) => {
      state.text = action.payload;
    },
    
  },
});

export const { setQuestion} =
questionSlice.actions;

export default questionSlice.reducer;
