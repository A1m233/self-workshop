import { RootState } from "@/app/store";
import { PageType, TodoType } from "@/types/todo";
import { todoTypeChecker } from "@/util";
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

export const selectTodoList = (state: RootState) => state.todo.todoList;

function selectCount(type: PageType)
{
  return (state: RootState) =>
  {
    let todoList = state.todo.todoList;
    return todoList.reduce((accmulator, todo) =>
    {
      if (todoTypeChecker(type, todo))accmulator++;
      return accmulator;
    }, 0);
  };
}
export const selectDueCount = selectCount('即将到期');
export const selectUnfinishedCount = selectCount('未将到期且未完成');
export const selectFinishedCount = selectCount('已完成');
export const selectExpiredCount = selectCount('到期');