import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import TodoList from "@/features/todo/TodoList";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
const AllTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '全部');
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const filteredTodoList = todoList;
  return (
    <>
      <TodoList pageType="全部" todoList={filteredTodoList}/>
    </>
  );
};

export default AllTodosPage;