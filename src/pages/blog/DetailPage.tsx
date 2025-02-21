import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import Directory from "@/features/blog/Directory";
import { useTitle } from "ahooks";
import { Button, InputProps, Layout, Modal, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { FC, useEffect, useState } from "react";
import styles from './DetailPage.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveBlogContent, selectSavedBlogContent, setLastOpenedFile } from "@/features/blog/blogSlice";
import { Content } from "antd/es/layout/layout";
import dayjs from "dayjs";
import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { MdEditor, ToolbarNames } from "md-editor-rt";
import 'md-editor-rt/lib/style.css';

const DetailPage: FC = () =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '详情');

  const toolbarsExclude: ToolbarNames[] = ['github', 'catalog', 'prettier', 'fullscreen', 'htmlPreview', 'pageFullscreen', 'preview', 'previewOnly', 'save'];

  const { key: currentPageKey } = useParams();

  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFileHandle, setUploadFileHandle] = useState();
  const savedBlogContent = useSelector(selectSavedBlogContent);
  const [content, setContent] = useState(savedBlogContent[currentPageKey!].content ?? '');

  const showModal = () =>
  {
    setIsModalOpen(true);
  };
  async function handleOpenFile()
  {
    try
    {
      const [handle] = await (window as any).showOpenFilePicker(
      {
        types:
        [
          {
            description: 'Markdown files',
            accept: { 'text/markdown': ['.md'] },  // 限制只能选择 .md 文件
          },
        ],
      });
      setUploadFileHandle(handle); 
      // console.log(handle);
      let file: File = (uploadFileHandle as any).getFile();
      setContent(await file.text());
    }
    catch(err)
    {
      console.log(err);
    }
  }
  const handleOk = async () =>
  {
    await handleOpenFile();
    setIsModalOpen(false);
  }
  const handleCancel = () =>
  {
    setIsModalOpen(false);
  };
  const onClickUpload: InputProps['onClick'] = async () =>
  {
    await handleOpenFile();
  };
  const onClickDownload: InputProps['onClick'] = async () =>
  {
    try
    {
      const [handle] = await (window as any).showSaveFilePicker(
      {
        startIn: uploadFileHandle,
        types:
        [
          {
            description: 'Markdown files',
            accept: { 'text/markdown': ['.md'] },  // 限制只能选择 .md 文件
          },
        ],
        suggestedName: (uploadFileHandle as any).name,
      });
      const writableStream = await handle.createWritable();
      await writableStream.write(content);
      await writableStream.close();
    }
    catch(err)
    {
      console.log(err);
    }
  };

  useEffect(() =>
  {
    dispatch(setLastOpenedFile(currentPageKey?.toString()));
  }, [currentPageKey]);
  useEffect(() =>
  {
    showModal();
  }, []);
  useEffect(() =>
  {
    const timer = setTimeout(() =>
    {
      dispatch(saveBlogContent(
      {
        key: currentPageKey,
        blogContent:
        {
          lastModifiedTime: dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          content,
        },
      }));
    }, 2000);
    // 清除上一次的定时器，防止用户快速输入时产生多次不必要的更新
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <Layout>
      <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={'95%'}
      collapsedWidth="0">
        <Modal
        closable={false}
        title={'是否将本地Markdown文件同步到系统中' + (!savedBlogContent[currentPageKey!] ? `（系统中文件上次修改时间为"${savedBlogContent[currentPageKey!].lastModifiedTime}"）` : '') + '？'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="是"
        cancelText="否" />
        {collapsed ? <></> : <Directory pageType="DetailPage"/>}
      </Sider>
      <Content className={styles['content']}>
        <Space.Compact>
          <Button onClick={onClickUpload} type="primary"><CloudUploadOutlined />将本地Markdown文件同步到系统中</Button>
          <Button onClick={onClickDownload} type="primary"><CloudDownloadOutlined />将系统中Markdown文件同步到本地</Button>
        </Space.Compact>
        <MdEditor value={content} onChange={setContent} toolbarsExclude={toolbarsExclude} style={{height: `calc(100vh - 64px - 40px - 32px)`}}/>
      </Content>
    </Layout>
  );
};

export default DetailPage;