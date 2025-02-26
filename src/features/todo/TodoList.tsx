// TodoList.tsx
import type { TodoType } from "@/types/todo";
import { Button, Input, InputProps, Pagination, PaginationProps} from "antd";
import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Todo from "./Todo";
import styles from './TodoList.module.css';
import TodoModal, { TodoModalHandles } from "./TodoModal";

interface PropsType
{
  pageType: string,
  todoList: TodoType[],
};

const TodoList: FC<PropsType> = memo(props =>
{
  const { pageType, todoList } = props;

  const todoModalRef = useRef<TodoModalHandles>(null);

  const [inputContent, setInputContent] = useState('');
  const [debouncedInputContent, setDebouncedInputContent] = useState('');
  const searchedTodoList = useMemo(() => {
    if (debouncedInputContent === '') return todoList;
    return todoList.filter(todo => todo.content.includes(debouncedInputContent));
  }, [debouncedInputContent, todoList]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() =>
  {
    const timer = setTimeout(() =>
    {
      setDebouncedInputContent(inputContent);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputContent]);
  const onChange: InputProps['onChange'] = useCallback((e: any) =>
  {
    setInputContent(e.target.value);
  }, []);
  const showModal = useCallback(() =>
  {
    if (todoModalRef.current)
    {
      todoModalRef.current.showModal();
    }
  }, []);
  const onPageChange: PaginationProps['onChange'] = useCallback((page: number) =>
  {
    setCurrentPage(page);
  }, []);

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
            searchedTodoList.slice((currentPage - 1) * 10, currentPage * 10).map(todo =>
            {
              return <Todo todo={todo} key={todo.id}/>
            })
          }
          <Pagination
          align='center'
          total={searchedTodoList.length}
          showTotal={total => `共 ${total} 个待办事项`}
          onChange={onPageChange}
          style={{marginBottom: '20px'}}/>
        </div>
      </div>
    </div>
  );
});

export default TodoList;