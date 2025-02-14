import { RootState } from "@/app/store";
import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import TodoList from "@/features/todo/TodoList";
import { filterChecker } from "@/util";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";

const UnfinishedTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '未到期但未完成');
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const filteredTodoList = todoList.filter(element => filterChecker('未到期但未完成', element));
  return (
    <>
      <TodoList pageType="未到期但未完成" todoList={filteredTodoList}/>
    </>
  );
};

export default UnfinishedTodosPage;