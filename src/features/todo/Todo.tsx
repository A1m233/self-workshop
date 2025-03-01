// Todo.tsx
import type { TodoType } from "@/types/todo";
import { App, Button, ButtonProps, Card, CardProps, Checkbox, CheckboxProps, Popconfirm, PopconfirmProps, Space, Tooltip } from "antd";
import { FC, memo, useCallback, useRef, useState } from "react";
import styles from './Todo.module.css';
import { deleteTodo, switchTodoState } from "./todoSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { CopyFilled, DeleteFilled, EditFilled } from "@ant-design/icons";
import TodoModal, { TodoModalHandles } from "./TodoModal";

interface PropsType
{
  todo: TodoType,
};

const TodoInner: FC<PropsType> = memo(({ todo }) =>
{
  const { message } = App.useApp();

  const { isFinished, content, expiration, id } = todo;
  
  const dispatch = useDispatch();

  const todoModalRef = useRef<TodoModalHandles>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);

  const showModal = useCallback(() =>
  {
    if (todoModalRef.current)
    {
      todoModalRef.current.showModal();
    }
  }, [todoModalRef]);
  const onChange: CheckboxProps['onChange'] = useCallback(() =>
  {
    dispatch(switchTodoState(id));
  }, [id]);
  const handleCopy: ButtonProps['onClick'] = useCallback(async () =>
  {
    await navigator.clipboard.writeText(content);
    message.open(
    {
      type: 'success',
      content: '成功将待办事项内容复制到粘贴板',
    });
  }, [content]);
  const handleDelete = useCallback(() =>
  {
    dispatch(deleteTodo(id));
  }, [id]);
  const onConfirm: PopconfirmProps['onConfirm'] = useCallback(() =>
  {
    handleDelete();
  }, [handleDelete]);
  const onMouseOver: CardProps['onMouseOver'] = useCallback(() => setIsMouseOver(true), []);
  const onMouseLeave: CardProps['onMouseLeave'] = useCallback(() => setIsMouseOver(false), []);

  return (
    <>
      <Card
      classNames={{body: styles['todo-card-body']}}
      className={styles['todo-card']}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      hoverable>
        <TodoModal
        ref={todoModalRef}
        expiration={expiration}
        content={content}
        id={id}/>
        <div className={styles['card-content']}>
          <Checkbox
          onChange={onChange}
          checked={isFinished}
          className={styles['checkbox']}>
            <p>{content}</p>
          </Checkbox>
        </div>
        <div className={styles['card-footer']}>
          <span>
            <p>
              {'到期时间：' + dayjs(expiration).format('YYYY-MM-DD HH:mm:ss')}
            </p>
          </span>
          <Space.Compact className={styles['button-group']}>
            {
              isMouseOver ? (
                <>
                  <Tooltip title="复制待办事项内容">
                    <Button icon={<CopyFilled />} onClick={handleCopy}/>
                  </Tooltip>
                  <Tooltip title="编辑待办事项">
                    <Button icon={<EditFilled />} onClick={showModal}/>
                  </Tooltip>
                  <Tooltip title="删除待办事项">
                    <Popconfirm
                    title="删除当前待办事项"
                    description="是否确定删除当前待办事项？"
                    onConfirm={onConfirm}
                    okText="确认"
                    cancelText="取消">
                      <Button danger icon={<DeleteFilled />} />
                    </Popconfirm>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Button icon={<CopyFilled />} onClick={handleCopy}/>
                  <Button icon={<EditFilled />} onClick={showModal}/>
                  <Button danger icon={<DeleteFilled />} />
                </>
              )
            }
          </Space.Compact>
        </div>
      </Card>
    </>
  );
});

const Todo: FC<PropsType> = memo(({ todo }) =>
{
  return (
    <App>
      <TodoInner todo={todo}/>
    </App>
  );
});

export default Todo;