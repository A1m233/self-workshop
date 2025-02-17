import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import TodoList from "@/features/todo/TodoList";
import { selectTodoList } from "@/features/todo/todoSlice";
import { todoTypeChecker } from "@/util/todo";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";

const UnfinishedTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '未到期但未完成');
  const todoList = useSelector(selectTodoList);
  const filteredTodoList = todoList.filter(element => todoTypeChecker('未将到期且未完成', element));
  return (
    <>
      <TodoList pageType="未将到期且未完成" todoList={filteredTodoList}/>
    </>
  );
};

export default UnfinishedTodosPage;