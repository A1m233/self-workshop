import type { TodoType } from "@/types/todo";
import { Card } from "antd";
import { FC } from "react";
import styles from './Todo.module.css';

interface PropsType
{
  todo: TodoType,
};

const Todo: FC<PropsType> = props =>
{
  const { todo } = props;
  const { isFinished, content, expiration, id } = todo;
  return (
    <Card className={styles['todo-card']} hoverable loading>
      
    </Card>
  );
};

export default Todo;