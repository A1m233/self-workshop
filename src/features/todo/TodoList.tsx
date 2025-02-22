// TodoList.tsx
import type { TodoType } from "@/types/todo";
import { Button, Input, InputProps} from "antd";
import { FC, useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import styles from './TodoList.module.css';
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

  const [inputContent, setInputContent] = useState('');
  const [searchedTodoList, setSearchedTodoList] = useState(searchTodoList());

  const showModal = () =>
  {
    if (todoModalRef.current)
    {
      todoModalRef.current.showModal();
    }
  };
  const onChange: InputProps['onChange'] = e =>
  {
    setInputContent(e.target.value);
  }
  function searchTodoList()
  {
    return inputContent === '' ? todoList : todoList.filter(todo => todo.content.includes(inputContent));
  }

  useEffect(() =>
  {
    const timer = setTimeout(() =>
    {
      setSearchedTodoList(searchTodoList());
    }, 500);
    // 清除上一次的定时器，防止用户快速输入时产生多次不必要的更新
    return () => clearTimeout(timer);
  }, [inputContent]);
  useEffect(() =>
  {
    setSearchedTodoList(searchTodoList());
    console.log(todoList);
  }, [todoList]);

  return (
    <div>
      <div className={styles['header']}>
        <h3>{pageType + '待办事项列表'}</h3>
        <Input
        value={inputContent}
        onChange={onChange}
        className={styles['input']}
        placeholder="输入待办事项内容以检索"
        allowClear />
      </div>
      <div className={styles['body']}>
        <Button type="primary" onClick={showModal}>新建待办事项</Button>
        <TodoModal ref={todoModalRef} />
        <div className={styles['todolist-wrapper']}>
          {
            searchedTodoList.map(todo =>
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