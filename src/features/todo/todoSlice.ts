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
      console.log(isFinished, content, expiration)
      state.todoList.push(
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
      state.todoList = state.todoList.map(element => element.id === id ? element : {...element, isFinished: !element.isFinished});
    },
    editTodoContent(state, action)
    {
      const {id, content} = action.payload;
      state.todoList = state.todoList.map(element => element.id === id ? element : {...element, content});
    },
    editTodoExpiration(state, action)
    {
      const {id, expiration} = action.payload;
      state.todoList = state.todoList.map(element => element.id === id ? element : {...element, expiration});
    },
  },
});

export const { addTodo, deleteTodo, switchTodoState, editTodoContent, editTodoExpiration } = todoSlice.actions;

export default todoSlice.reducer;