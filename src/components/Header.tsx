import './Header.scss';

import { FC } from "react";
import { AlertFilled, CloudFilled, FileTextFilled, ToolFilled } from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] =
[
  {
    label:
    <a onClick={() => alert('1')}>
      <span>Self Workshop</span>
    </a>,
    key: 'icon',
    icon: <ToolFilled />,
  },
  {
    label: '待办事项',
    key: 'todo',
    icon: <FileTextFilled />,
  },
  {
    label: '个人博客',
    key: 'blog',
    icon: <CloudFilled />,
  },
  {
    label: '待办事项：0 个即将过期，1 个未完成',
    key: 'dues and expireds',
    icon: <AlertFilled />,
    disabled: true,
  },
];
const Header: FC = () =>
{
  return (
    <>
      <Menu mode="horizontal" items={items} />
    </>
  );
};

export default Header;