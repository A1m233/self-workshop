import { RootState } from "@/app/store";
import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import TodoList from "@/features/todo/TodoList";
import { filterChecker } from "@/util";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";

const ExpiredTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '到期');
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const filteredTodoList = todoList.filter(element => filterChecker('到期', element));
  return (
    <>
      <TodoList pageType="到期" todoList={filteredTodoList}/>
    </>
  );
};

export default ExpiredTodosPage;
