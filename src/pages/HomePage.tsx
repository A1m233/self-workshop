import { TITLE_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import styles from './HomePage.module.css';
import { Card } from "antd";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDueCount, selectExpiredCount, selectUnfinishedCount } from "@/features/todo/todoSlice";
import { selectDaliyContribution } from "@/features/blog/blogSlice";
import { Tooltip as ReactToolTip } from 'react-tooltip';
import dayjs from "dayjs";
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
dayjs.extend(isSameOrBefore)

interface DailyContribution
{
  date: string,
  count: number,
};

const translate =
{
  0: '天',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
}

const HomePage: FC = () =>
{
  useTitle(TITLE_PREFIX + '首页');

  const dueCount = useSelector(selectDueCount);
  const unfinishedCount = useSelector(selectUnfinishedCount);
  const expiredCount = useSelector(selectExpiredCount);
  const dailyContributionFromRedux = useSelector(selectDaliyContribution);

  const dailyContribution: DailyContribution[] = Object.entries(dailyContributionFromRedux).reduce((accmulator, item) =>
  {
    const [date, count] = item;
    accmulator.push(
    {
      date,
      count,
    });
    return accmulator
  }, [] as Array<any>);
  const fullYearDailyContribution = [];
  for (let day = dayjs().subtract(1, 'year').add(1, 'day'); day.isSameOrBefore(dayjs(), 'day'); day = day.add(1, 'day'))
  {
    const date = day.format('YYYY-MM-DD');
    if (date in dailyContributionFromRedux)
    {
      fullYearDailyContribution.push(
      {
        date,
        count: dailyContributionFromRedux[date],
      });
      continue;
    }
    fullYearDailyContribution.push(
    {
      date,
      count: 0,
    });
  }

  const maxCount = dailyContribution.reduce((accmulator: number, item) =>
  {
    return Math.max(accmulator, item.count);
  }, 0);
  const minCount = dailyContribution.reduce((accmulator, item) =>
  {
    return Math.min(accmulator, item.count);
  }, Infinity);
  const expiredReminder =
  expiredCount ?
  <p>💀 警告，你有 {expiredCount} 个<Link to="/todo/list/expired">到期的待办事项</Link></p>
  : <p>🎉 恭喜你，现在没有任何到期待办事项</p>;
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

  function classForValue(value: any)
  {
    if (!value || !value.count)return 'color-empty';
    const len = maxCount - minCount + 1;
    const pos = value.count - minCount;
    if (len === 1)return 'color-scale-1';
    if (pos >= 0.75 * len)return 'color-scale-1';
    else if (pos >= 0.50 * len)return 'color-scale-2';
    else if (pos >= 0.25 * len)return 'color-scale-3';
    return 'color-scale-4';
  }
  const handleToolTip = (value: any) =>
  {
    const date = value.date;
    const count = value.count;
    return {
      'data-tooltip-content': `${date} 星期${translate[dayjs(date).day()]} 进行了 ${count} 次修改`,
      'data-tooltip-id': 'calendar-heatmap-tooltip',
    };
  };

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
          tooltipDataAttrs={handleToolTip as any}
          values={fullYearDailyContribution}
          classForValue={classForValue}/>
          <ReactToolTip id='calendar-heatmap-tooltip' />
        </div>
      </Card>
    </div>
  );
};

export default HomePage;