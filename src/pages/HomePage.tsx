import { TITLE_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styles from './HomePage.module.css';
import { Card } from "antd";
import { Link } from "react-router-dom";

const HomePage: FC = () =>
{
  useTitle(TITLE_PREFIX + '首页');
  return (
    <div className={styles['container']}>
      <Card title="待办事项未完成提醒">
        <div className={styles['reminder-container']}>
          {/*
          todo: 特判0个的情况
          列出这些待办事项的名字
          */}
          <p>❗ 需要注意，你有1个<Link to="/todo/list/due">即将过期的待办事项</Link>，要抓紧了：</p>
          <p>⚠ 除此之外，你还有1个<Link to="/todo/list/unfinished">未完成的待办事项</Link>，有空看看：</p>
        </div>
      </Card>
      <Card title="个人博客活动图">
        <div className={styles['calendar-wrapper']}>
          {/*
          todo: 加入下拉列表以选择年份
          调整颜色变化范围，使得变化更加明显
          hover时显示当天有多少次修改
          click时显示哪些文件修改了多少次
          */}
          <CalendarHeatmap
          startDate={new Date().setFullYear(new Date().getFullYear() - 1)}
          endDate={new Date()}
          values={
          [
            { date: '2025-02-10', count: 1 },
            { date: '2025-02-11', count: 2 },
            { date: '2025-02-12', count: 4 },
            { date: '2025-02-13', count: 3 },
            { date: '2025-02-14', count: 1 },
          ]}/>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;