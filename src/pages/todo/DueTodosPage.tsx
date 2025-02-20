import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import TodoList from "@/features/todo/TodoList";
import { selectTodoList } from "@/features/todo/todoSlice";
import { todoTypeChecker } from "@/util/todo";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";

const DueTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '即将到期');
  const todoList = useSelector(selectTodoList);
  const filteredTodoList = todoList.filter(element => todoTypeChecker('即将到期', element));
  return (
    <>
      <TodoList pageType="即将到期" todoList={filteredTodoList}/>
    </>
  );
};

export default DueTodosPage;