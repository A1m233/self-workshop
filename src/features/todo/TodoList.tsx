import type { TodoType } from "@/types/todo";
import { Button, Input} from "antd";
import { FC, useRef } from "react";
import Todo from "./Todo";
import styles from './TodoList.module.css';
import './index.css';
import TodoModal, { TodoModalHandles } from "./TodoModal";

interface PropsType
{
  pageType: string,
  todoList: TodoType[],
};

const TodoList: FC<PropsType> = props =>
{
  const { pageType, todoList } = props;

  const todoModalRef = useRef<TodoModalHandles>(null);

  const showModal = () =>
  {
    if (todoModalRef.current)
    {
      todoModalRef.current.showModal(); // 调用子组件中的 showModal 方法
    }
  };

  return (
    <div>
      <div className={styles['header']}>
        <h3>{pageType + '待办事项列表'}</h3>
        <Input
        className={styles['input']}
        placeholder="输入待办事项内容以检索" />
      </div>
      <div className={styles['body']}>
        <Button type="primary" onClick={showModal}>新建待办事项</Button>
        <TodoModal ref={todoModalRef} />
        <div className={styles['todolist-wrapper']}>
          {
            todoList.map(todo =>
            {
              return <Todo todo={todo} key={todo.id}/>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default TodoList;