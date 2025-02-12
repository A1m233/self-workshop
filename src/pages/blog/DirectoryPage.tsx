import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const DirectoryPage: FC = () =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '目录结构');
  return (
    <>
    </>
  );
};

export default DirectoryPage;