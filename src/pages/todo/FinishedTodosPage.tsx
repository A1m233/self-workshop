import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const FinishedTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '已完成');
  return (
    <>
    </>
  );
};

export default FinishedTodosPage;