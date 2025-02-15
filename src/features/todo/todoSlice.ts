import { TodoType } from "@/types/todo";
import { createSlice } from "@reduxjs/toolkit";


export const todoSlice = createSlice(
{
  name: 'todo',
  initialState:
  {
    todoList: [] as TodoType[],
    currentId: 1,
  },
  reducers:
  {
    addTodo(state, action)
    {
      const {isFinished, content, expiration} = action.payload;
      state.todoList.unshift(
      {
        isFinished,
        content,
        expiration,
        id: state.currentId,
      });
      state.currentId++;
    },
    deleteTodo(state, action)
    {
      const id = action.payload;
      state.todoList = state.todoList.filter(element => element.id !== id);
    },
    switchTodoState(state, action)
    {
      const id = action.payload;
      state.todoList = state.todoList.map(element => element.id !== id ? element : {...element, isFinished: !element.isFinished});
    },
    editTodo(state, action)
    {
      const {id, content, expiration} = action.payload;
      state.todoList = state.todoList.map(element => element.id !== id ? element : {...element, content, expiration});
    },
  },
});

export const { addTodo, deleteTodo, switchTodoState, editTodo } = todoSlice.actions;

export default todoSlice.reducer;