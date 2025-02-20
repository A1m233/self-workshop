import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import { selectKeyToRealPath } from "@/features/blog/blogSlice";
import { useTitle } from "ahooks";
import { FC } from "react";
import { useSelector } from "react-redux";

interface PropsType
{
  key: React.Key,
  title: string,
};

const DetailPage: FC<PropsType> = props =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '详情');

  const { key, title } = props;

  const keyToRealPath = useSelector(selectKeyToRealPath);
  console.log(keyToRealPath);
  const realPath = keyToRealPath.get(key);

  // const handleFile = async () => {
  //   const dirHandle = await window.showDirectoryPicker(); // 选择目录
  //   const fileHandle = await dirHandle.getFileHandle('example.txt'); // 选择文件
  //   const file = await fileHandle.getFile(); // 获取文件对象
  //   const text = await file.text(); // 读取文件内容
  //   console.log(text);
  // };
  // handleFile();

  return (
    <>
    </>
  );
};

export default DetailPage;