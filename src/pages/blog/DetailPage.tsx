import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import Directory from "@/features/blog/Directory";
import { useTitle } from "ahooks";
import { Breadcrumb, Button, InputProps, Layout, message, Modal, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { FC, useEffect, useState } from "react";
import styles from './DetailPage.module.css';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveBlogContent, saveEditorMode, selectSavedBlogContent, selectSaveEditorMode, setLastOpenedFile } from "@/features/blog/blogSlice";
import { Content } from "antd/es/layout/layout";
import dayjs from "dayjs";
import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { MdEditor, MdPreview, ToolbarNames } from "md-editor-rt";
import 'md-editor-rt/lib/style.css';
import { searchPath } from "@/util/blog";

const DetailPage: FC = () =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '详情');

  const { key: currentPageKey } = useParams();

  const toolbarsExclude: ToolbarNames[] = ['github', 'catalog', 'prettier', 'fullscreen', 'htmlPreview', 'pageFullscreen', 'preview', 'previewOnly', 'save'];
  const currentPath = searchPath(currentPageKey!);

  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFileHandle, setUploadFileHandle] = useState<FileSystemFileHandle>();
  const savedBlogContent = useSelector(selectSavedBlogContent);
  const [content, setContent] = useState(savedBlogContent[currentPageKey!]?.content ?? '');
  const [messageApi, contextHolder] = message.useMessage();
  const savedEditorMode = useSelector(selectSaveEditorMode);
  const [editorMode, setEditorMode] = useState(savedEditorMode[currentPageKey!] ?? 'preview');

  const showModal = () =>
  {
    setIsModalOpen(true);
  };
  async function handleOpenFile(fn?: Function)
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
      let file: File = await (handle as any).getFile();
      setContent(await file.text());
      if (fn)fn();
      messageApi.success('成功从本地同步到系统');
      setUploadFileHandle(handle);
    }
    catch(err)
    {
      if (fn)fn();
      messageApi.error(`从本地同步到系统失败：${err}`, 5);
    }
  }
  const handleOk = async () =>
  {
    handleOpenFile(() => setIsModalOpen(false));
  };
  const handleCancel = () =>
  {
    setIsModalOpen(false);
    messageApi.info('取消从本地同步到系统');
  };
  const onClickUpload: InputProps['onClick'] = async () =>
  {
    await handleOpenFile();
  };
  const onClickDownload: InputProps['onClick'] = async () =>
  {
    try
    {
      const handle = await (window as any).showSaveFilePicker(
      {
        startIn: uploadFileHandle,
        types:
        [
          {
            description: 'Markdown files',
            accept: { 'text/markdown': ['.md'] },  // 限制只能选择 .md 文件
          },
        ],
        suggestedName: uploadFileHandle?.name,
      });
      const writableStream = await handle.createWritable();
      await writableStream.write(content);
      await writableStream.close();
      messageApi.success('成功从系统同步到本地');
    }
    catch(err)
    {
      messageApi.error(`从系统同步到本地失败：${err}`, 5);
      console.log(err);
    }
  };

  useEffect(() =>
  {
    dispatch(setLastOpenedFile(currentPageKey?.toString()));
    setCollapsed(true);
    setIsModalOpen(false);
    setUploadFileHandle(undefined);
    if (content !== (savedBlogContent[currentPageKey!]?.content ?? ''))
    {
      setContent(savedBlogContent[currentPageKey!]?.content ?? '');
    }
    setEditorMode(savedEditorMode[currentPageKey!] ?? 'preview');
    // showModal();
  }, [currentPageKey]);
  useEffect(() =>
  {
    dispatch(saveEditorMode(editorMode));
  }, [editorMode]);
  useEffect(() =>
  {
    // showModal();
  }, []);
  useEffect(() =>
  {
    const timer = setTimeout(() =>
    {
      if (content === (savedBlogContent[currentPageKey!]?.content ?? ''))return;
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
    <Layout className={styles['layout']}>
      {contextHolder}
      {/* <Modal
      closable={false}
      title={'是否将本地Markdown文件同步到系统中' + (savedBlogContent[currentPageKey!] ? `（系统中文件上次修改时间为 "${savedBlogContent[currentPageKey!].lastModifiedTime}" ）` : '') + '？'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="是"
      cancelText="否" /> */}
      <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={'95%'}
      collapsedWidth="0">
        <Directory pageType="DetailPage" isVisible={!collapsed}/>
      </Sider>
      <Content className={styles['content']} style={{display: collapsed ? '' : 'none'}}>
        <Space.Compact>
          <Button onClick={onClickUpload} type="primary"><CloudUploadOutlined style={{fontSize: '18px'}}/>将本地Markdown文件同步到系统中</Button>
          <Button onClick={onClickDownload} type="primary"><CloudDownloadOutlined style={{fontSize: '18px'}} />将系统中Markdown文件同步到本地</Button>
        </Space.Compact>
        <Space.Compact>
          <Button onClick={() => setEditorMode('preview')} type={editorMode === 'preview' ? 'primary' : 'default'} shape="round">预览模式</Button>
          <Button onClick={() => setEditorMode('edit')} type={editorMode === 'edit' ? 'primary' : 'default'} shape="round">编辑模式</Button>
        </Space.Compact>
        <div className={styles['md-wrapper']}>
          <div className={styles['breadcrumb-wrapper']}>
            <Breadcrumb
            items={currentPath}/>
          </div>
          <MdEditor value={content} onChange={setContent} style={{display: editorMode === 'edit' ? '' : 'none'}} toolbarsExclude={toolbarsExclude} className={styles['md']}/>
          <MdPreview value={content} style={{display: editorMode === 'preview' ? '' : 'none'}} className={styles['md']}/>
        </div>
      </Content>
    </Layout>
  );
};

export default DetailPage;