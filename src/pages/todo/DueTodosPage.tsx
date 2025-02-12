import { TITLE_PREFIX, TODO_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const DueTodosPage: FC = () =>
{
  useTitle(TITLE_PREFIX + TODO_PREFIX + '即将到期');
  return (
    <>
    </>
  );
};

export default DueTodosPage;