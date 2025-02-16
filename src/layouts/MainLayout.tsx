import SelfHeader from "@/components/SelfHeader";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import styles from './MainLayout.module.css';

const MainLayout: FC = () =>
{
  return (
    <Layout className={styles['layout']}>
      <SelfHeader />
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;