import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import Directory from "@/features/blog/Directory";
import { useTitle } from "ahooks";
import { FC } from "react";

const DirectoryPage: FC = () =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '目录结构');
  return (
    <>
      <Directory pageType="DirectoryPage" />
    </>
  );
};

export default DirectoryPage;