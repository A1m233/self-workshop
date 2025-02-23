import { FC } from "react";
import { AlertFilled, CloudFilled, FileTextFilled, ToolFilled } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDueCount, selectExpiredCount, selectUnfinishedCount } from '@/features/todo/todoSlice';
import styles from './SelfHeader.module.css';
import { selectLastOpenedFile } from "@/features/blog/blogSlice";

type MenuItem = Required<MenuProps>['items'][number];
const SelfHeader: FC = () =>
{
  const dueCount = useSelector(selectDueCount);
  const unfinishedCount = useSelector(selectUnfinishedCount);
  const expiredCount = useSelector(selectExpiredCount);
  const {pathname} = useLocation();
  const lastOpenedFile = useSelector(selectLastOpenedFile);

  const items: MenuItem[] =
  [
    {
      label:
      <Link to='/'>
        Self Workshop
      </Link>,
      key: '/',
      icon: <ToolFilled />,
    },
    {
      label: '待办事项',
      key: 'todo',
      icon: <FileTextFilled />,
      children:
      [
        {
          type: 'group',
          label: '列表',
          children:
          [
            { label: <Link to='/todo/list/all'>全部待办事项</Link>, key: '/todo/list/all' },
            { label: <Link to='/todo/list/finished'>已完成待办事项</Link>, key: '/todo/list/finished' },
            { label: <Link to='/todo/list/unfinished'>未将到期且未完成待办事项</Link>, key: '/todo/list/unfinished' },
            { label: <Link to='/todo/list/due'>即将到期待办事项</Link>, key: '/todo/list/due' },
            { label: <Link to='/todo/list/expired'>到期待办事项</Link>, key: '/todo/list/expired' },
          ],
        },
        {
          type: 'group',
          label: '统计',
          children:
          [
            { label: <Link to='/todo/statistics'>统计数据</Link>, key: '/todo/statistics' },
          ],
        },
      ],
    },
    {
      label: '个人博客',
      key: 'blog',
      icon: <CloudFilled />,
      children:
      [
        {
          label: <Link to='/blog/directory'>目录结构</Link>,
          key: '/blog/directory',
        },
        {
          label: <Link to={'/blog/detail/' + lastOpenedFile}>详情</Link>,
          key: '/blog/detail',
        },
      ],
    },
  ];

  return (
    <Header className={styles['antd-header']}>
      <div style={{flex: 1}}>
        <Menu mode="horizontal" items={items} theme='dark' className={styles['header-menu']} selectedKeys={[pathname.includes('/blog/detail') ? '/blog/detail' : pathname]}/>
      </div>
      <div className={styles['reminder-wrapper']}>
        <p className={styles['reminder']}>
          <AlertFilled /> 待办事项：{expiredCount} 个<Link to="/todo/list/expired">已到期</Link>，{dueCount} 个<Link to="/todo/list/due">即将到期</Link>，除此之外还有 {unfinishedCount} 个<Link to="/todo/list/unfinished">未完成</Link>
        </p>
      </div>
    </Header>
  );
};

export default SelfHeader;