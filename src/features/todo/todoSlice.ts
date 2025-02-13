import { createSlice } from "@reduxjs/toolkit";

interface Todo
{
	state: boolean,
  content: string,
  expiration: number, // 时间戳？
};

export const todoSlice = createSlice(
{
  name: 'todo',
  initialState:
  {
    todolist: [] as Todo[],
  },
  reducers:
  {
    addTodo(state, action)
    {
      
    },
    deleteTodo(state, action)
    {
      
    },
    switchTodoState(state, action)
    {

    },
    editTodoContent(state, action)
    {

    },
    editTodoExpiration(state, action)
    {

    },
  },
});

export const { addTodo, deleteTodo, switchTodoState, editTodoContent, editTodoExpiration } = todoSlice.actions;

export default todoSlice.reducer;