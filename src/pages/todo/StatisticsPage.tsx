import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const StatisticsPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '统计数据');
  return (
    <>
    </>
  );
};

export default StatisticsPage;