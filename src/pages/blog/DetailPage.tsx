import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import { useTitle } from "ahooks";
import { FC } from "react";

const DetailPage: FC = () =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '详情');
  return (
    <>
    </>
  );
};

export default DetailPage;