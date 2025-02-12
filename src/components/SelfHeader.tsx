import './SelfHeader.css';

import { FC } from "react";
import { AlertFilled, CloudFilled, FileTextFilled, ToolFilled } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] =
[
  {
    label:
    <Link to='/'>
      Self Workshop
    </Link>,
    key: 'icon',
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
          { label: <Link to='/todo/list/all'>全部待办事项</Link>, key: 'all' },
          { label: <Link to='/todo/list/finished'>已完成待办事项</Link>, key: 'finished' },
          { label: <Link to='/todo/list/unfinished'>未完成且尚未即将到期待办事项</Link>, key: 'unfinished' },
          { label: <Link to='/todo/list/due'>即将到期待办事项</Link>, key: 'due' },
          { label: <Link to='/todo/list/expired'>到期待办事项</Link>, key: 'expired' },
        ],
      },
      {
        type: 'group',
        label: '统计',
        children:
        [
          { label: <Link to='/todo/statistics'>统计数据</Link>, key: 'statistics' },
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
        key: 'directory',
      },
      // todo: 此时应该进入上次查看的博客
      {
        label: <Link to='/blog/detail'>详情</Link>,
        key: 'detail',
      },
    ],
  },
  // {
  //   label: <a>'待办事项：1 个即将过期，除此之外还有 1 个未完成'</a>,
  //   key: 'dues and expireds',
  //   icon: <AlertFilled />,
  //   disabled: true,
  // },
];
const SelfHeader: FC = () =>
{
  return (
    <Header className='antd-header'>
      <div style={{flex: 1}}>
        <Menu mode="horizontal" items={items} theme='dark'/>
      </div>
      <div className='reminder-wrapper'>
        <p className='reminder'>
          <AlertFilled /> 待办事项：1 个<Link to="/todo/list/due">即将过期</Link>，除此之外还有 1 个<Link to="/todo/list/unfinished">未完成</Link>
        </p>
      </div>
    </Header>
  );
};

export default SelfHeader;