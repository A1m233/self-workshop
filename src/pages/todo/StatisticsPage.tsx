import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { Row, Col, Card } from "antd";
import { FC } from "react";
import styles from './StatisticsPage.module.css';
import { useSelector } from "react-redux";
import { selectDueCount, selectExpiredCount, selectFinishedCount, selectUnfinishedCount } from "@/features/todo/todoSlice";

const StatisticsPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '统计数据');

  const finishedCount = useSelector(selectFinishedCount);
  const unfinishedCount = useSelector(selectUnfinishedCount);
  const dueCount = useSelector(selectDueCount);
  const expiredCount = useSelector(selectExpiredCount);

  return (
    <div className={styles['card-group']}>
      <Row gutter={16} className={styles['row']}>
        <Col span={6}>
          <Card title="已完成待办事项" variant="borderless" hoverable>
            目前有 {finishedCount} 个已完成待办事项
          </Card>
        </Col>
        <Col span={6}>
          <Card title="未将到期且未完成待办事项" variant="borderless">
            目前有 {unfinishedCount} 个未将到期且未完成待办事项
          </Card>
        </Col>
        <Col span={6}>
          <Card title="即将到期待办事项" variant="borderless">
          目前有 {dueCount} 个即将到期待办事项
          </Card>
        </Col>
        <Col span={6}>
          <Card title="到期待办事项" variant="borderless">
          目前有 {expiredCount} 个到期待办事项
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;