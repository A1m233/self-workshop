import { BLOG_PREFIX, TITLE_PREFIX } from "@/constant";
import Directory from "@/features/blog/Directory";
import { useTitle } from "ahooks";
import { Breadcrumb, Button, ButtonProps, InputProps, Layout, message, Space } from "antd";
import Sider, { SiderProps } from "antd/es/layout/Sider";
import { FC, useCallback, useEffect, useState } from "react";
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

const toolbarsExclude: ToolbarNames[] =
[
  'github',
  'catalog',
  'prettier',
  'fullscreen',
  'htmlPreview',
  'pageFullscreen',
  'preview',
  'previewOnly',
  'save'
];
const syncButtonStyle = {fontSize: '18px'};
const DetailPage: FC = () =>
{
  useTitle(TITLE_PREFIX + BLOG_PREFIX + '详情');

  const { key: currentPageKey } = useParams();

  const currentPath = searchPath(currentPageKey!);

  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const [uploadFileHandle, setUploadFileHandle] = useState<FileSystemFileHandle>();
  const savedBlogContent = useSelector(selectSavedBlogContent);
  const [content, setContent] = useState(savedBlogContent[currentPageKey!]?.content ?? '');
  const [messageApi, contextHolder] = message.useMessage();
  const savedEditorMode = useSelector(selectSaveEditorMode);
  const [editorMode, setEditorMode] = useState(savedEditorMode[currentPageKey!] ?? 'preview');

  const handleOpenFile = async function (fn?: Function)
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
  const onClickUpload: InputProps['onClick'] = useCallback(async () =>
  {
    await handleOpenFile();
  }, [handleOpenFile]);
  const onClickDownload: InputProps['onClick'] = useCallback(async () =>
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
  }, [uploadFileHandle, content]);
  const onEditClick: ButtonProps['onClick'] = useCallback(() => setEditorMode('edit'), []);
  const onPreviewClick: ButtonProps['onClick'] = useCallback(() => setEditorMode('preview'), []);
  const onCollapse: SiderProps['onCollapse'] = useCallback((value: any) => setCollapsed(value), []);

  useEffect(() =>
  {
    dispatch(setLastOpenedFile(currentPageKey?.toString()));
    setCollapsed(true);
    setUploadFileHandle(undefined);
    if (content !== (savedBlogContent[currentPageKey!]?.content ?? ''))
    {
      setContent(savedBlogContent[currentPageKey!]?.content ?? '');
    }
    setEditorMode(savedEditorMode[currentPageKey!] ?? 'preview');
  }, [currentPageKey]);
  useEffect(() =>
  {
    dispatch(saveEditorMode(
    {
      key: currentPageKey,
      newEditorMode: editorMode,
    }));
  }, [editorMode]);
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
    }, 10000);
    return () => clearTimeout(timer);
  }, [content]);

  return (
    <Layout className={styles['layout']}>
      {contextHolder}
      <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={'95%'}
      collapsedWidth="0">
        <Directory pageType="DetailPage" isVisible={!collapsed}/>
      </Sider>
      {collapsed && (
        <Content className={styles['content']}>
          <div className={styles['button-group']}>
            <Button onClick={onClickUpload} type="primary"><CloudUploadOutlined style={syncButtonStyle}/>将本地Markdown文件同步到系统中</Button>
            <Space.Compact>
              <Button onClick={onPreviewClick} type={editorMode === 'preview' ? 'primary' : 'default'} shape="round">预览模式</Button>
              <Button onClick={onEditClick} type={editorMode === 'edit' ? 'primary' : 'default'} shape="round">编辑模式</Button>
            </Space.Compact>
            <Button onClick={onClickDownload} type="primary"><CloudDownloadOutlined style={syncButtonStyle} />将系统中Markdown文件同步到本地</Button>
          </div>
          <div className={styles['md-wrapper']}>
            <div className={styles['breadcrumb-wrapper']}>
              <Breadcrumb items={currentPath}/>
            </div>
            {
              editorMode === 'edit' ? (
                <MdEditor value={content} onChange={setContent} toolbarsExclude={toolbarsExclude} className={styles['md']}/>
              ) : (
                <MdPreview value={content} className={styles['md']}/>
              )
            }
          </div>
        </Content>
      )}
    </Layout>
  );
};

export default DetailPage;