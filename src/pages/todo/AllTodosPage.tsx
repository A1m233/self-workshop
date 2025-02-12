import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const AllTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '全部');
  return (
    <>
    </>
  );
};

export default AllTodosPage;