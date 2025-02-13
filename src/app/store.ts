import todoReducer from "@/features/todo/todoSlice";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore(
{
  reducer:
  {
    todo: todoReducer,
  },
});