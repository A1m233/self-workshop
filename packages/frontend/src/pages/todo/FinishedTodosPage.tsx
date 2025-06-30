import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import TodoList from "@/features/todo/TodoList";
import { selectTodoList } from "@/features/todo/todoSlice";
import { todoTypeChecker } from "@/util/todo";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";

const FinishedTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '已完成');
  const todoList = useSelector(selectTodoList);
  const filteredTodoList = todoList.filter(element => todoTypeChecker('已完成', element));
  return (
    <>
      <TodoList pageType="已完成" todoList={filteredTodoList}/>
    </>
  );
};

export default FinishedTodosPage;