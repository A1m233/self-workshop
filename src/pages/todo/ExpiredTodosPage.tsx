import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const ExpiredTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '到期');
  return (
    <>
    </>
  );
};

export default ExpiredTodosPage;