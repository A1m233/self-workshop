// MainLayout.tsx
import SelfHeader from "@/components/SelfHeader";
import { Layout, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.css';
import { useDispatch, useSelector } from "react-redux";
import { selectTodoList, setTodoHasRemind } from "@/features/todo/todoSlice";
import { TodoType } from "@/types/todo";
import dayjs from "dayjs";

const MainLayout: FC = () =>
{
  const [api, contextHolder] = notification.useNotification();

  const todoList = useSelector(selectTodoList);
  const dispatch = useDispatch();

  function checkExpiration()
  {
    console.log('checkExpiration');
    const now = Date.now();  // 获取当前时间
    todoList.forEach(todo =>
    {
      if (todo.isFinished || todo.hasRemind)return;
      const timeDifference = todo.expiration - now;
      // 如果到期时间距离现在不到 1 天（24 小时以内），就产生提醒
      if (timeDifference > 0 && timeDifference <= 24 * 60 * 60 * 1000)
      {
        triggerReminder(todo);  // 调用提醒函数
      }
    });
  };
  function triggerReminder(todo: TodoType)
  {
    api.warning(
    {
      message: '你有一个新的即将到期待办事项',
      description:
      <>
        <p>到期时间：{dayjs(todo.expiration).format('YYYY-MM-DD HH:mm:ss')}</p>
        <p>内容：{todo.content}</p>
      </>,
      placement: 'topRight',
      duration: 0,
    });
    dispatch(setTodoHasRemind(todo.id));
  }

  useEffect(() =>
  {
    const intervalId = setInterval(() =>
    {
      checkExpiration();
    }, 60 * 1000);
    return () => clearInterval(intervalId);
  });

  return (
    <Layout className={styles['layout']}>
      {contextHolder}
      <SelfHeader />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;