import { TITLE_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC, useState } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styles from './HomePage.module.css';
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDueCount, selectExpiredCount, selectUnfinishedCount } from "@/features/todo/todoSlice";

const HomePage: FC = () =>
{
  useTitle(TITLE_PREFIX + '首页');

  const dueCount = useSelector(selectDueCount);
  const unfinishedCount = useSelector(selectUnfinishedCount);
  const expiredCount = useSelector(selectExpiredCount);
  const [expiredReminder, _] = useState(expiredCount ?
  <p>💀 警告，你有 {expiredCount} 个<Link to="/todo/list/expired">到期的待办事项</Link></p>
  : <p>🎉 恭喜你，现在没有任何到期待办事项</p>);
  let reminder;
  if (dueCount && unfinishedCount)
  {
    reminder = (
    <>
      <p>❗ 需要注意，你有 {dueCount} 个<Link to="/todo/list/due">即将到期的待办事项</Link>，要抓紧了</p>
      <p>⚠ 除此之外，你还有 {unfinishedCount} 个<Link to="/todo/list/unfinished">未完成的待办事项</Link>，有空看看</p>
    </>);
  }
  else if (!dueCount && !unfinishedCount)
  {
    reminder = (
      <>
        <p>🎉 恭喜你，现在没有任何未完成待办事项</p>
      </>
    );
  }
  else if (!dueCount && unfinishedCount)
  {
    reminder = (
      <>
        <p>🎉 恭喜你，现在没有任何即将到期待办事项</p>
        <p>⚠ 但除此之外，你还有 {unfinishedCount} 个<Link to="/todo/list/unfinished">未完成的待办事项</Link>，可以看看</p>
      </>
    );
  }
  else
  {
    reminder = (
      <>
        <p>❗ 需要注意，你有 {dueCount} 个<Link to="/todo/list/due">即将到期的待办事项</Link>，要抓紧了</p>
        <p>🎉 但除此之外，你没有未完成的待办事项了，加油💪</p>
      </>
    );
  }

  return (
    <div className={styles['container']}>
      <Card title="待办事项未完成提醒">
        <div className={styles['reminder-container']}>
          {expiredReminder}
          {reminder}
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
            { date: '2025-02-15', count: 3 },
            { date: '2025-02-16', count: 3 },
            { date: '2025-02-17', count: 3 },
            { date: '2025-02-17', count: 2 },
          ]}/>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;