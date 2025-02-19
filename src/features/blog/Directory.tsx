import { FC, useEffect, useState } from "react";
import styles from './Directory.module.css';
import { Alert, AlertProps, Button, Input, InputProps, Popconfirm, Tooltip, TreeDataNode } from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { onDropHelper } from "@/util/blog";
import { DeleteOutlined, EditOutlined, FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder, closeInfo, deleteData, editTitle, saveExpandedKeys, selectDirectoryData, selectSavedExpandedKeys, selectShowInfo, setDirectoryData } from "./blogSlice";
import { Link } from "react-router-dom";

interface PropsType
{
  pageType: 'DirectoryPage' | 'DetailPage',
};

const Directory: FC<PropsType> = props =>
{
  const { pageType } = props;

  const directoryData = useSelector(selectDirectoryData);
  const showInfo = useSelector(selectShowInfo);

  const dispatch = useDispatch();

  const [inputContent, setInputContent] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(pageType === 'DirectoryPage' ? useSelector(selectSavedExpandedKeys) : []);
  const [editNameInputContent, setEditNameInputContent] = useState('');
  const [addFileInputContent, setAddFileInputContent] = useState('');
  const [addFolderInputContent, setAddFolderInputContent] = useState('');

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) =>
  {
    console.log('Trigger Select', keys, info);
  };
  const onEditNameChange: InputProps['onChange'] = e =>
  {
    setEditNameInputContent(e.target.value);
  };
  const onAddFileChange: InputProps['onChange'] = e =>
  {
    setAddFileInputContent(e.target.value);
  };
  const onAddFolderChange: InputProps['onChange'] = e =>
  {
    setAddFolderInputContent(e.target.value);
  };
  const editNameConfirmHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      dispatch(editTitle(
      {
        node,
        title: editNameInputContent,
      }));
    };
  };
  const addFileConfirmHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      dispatch(addFile(
      {
        node,
        title: addFileInputContent,
      }));
      setExpandedKeys([...expandedKeys, node.key]);
    };
  };
  const addFolderConfirmHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      dispatch(addFolder(
      {
        node,
        title: addFolderInputContent,
      }));
      setExpandedKeys([...expandedKeys, node.key]);
    };
  };
  const deleteDataConfirmHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      dispatch(deleteData(node))
    };
  };
  function titleRender(nodeData: TreeDataNode)
  {
    const title = nodeData.title as string;
    const key = nodeData.key;const isRoot = key === '0';
    const isLeaf = nodeData.isLeaf;
    const isSearching = inputContent && title.includes(inputContent);
    const titleHolder =
    <span className={isSearching ? styles['searched-title'] : undefined}>
      &nbsp;
      {isLeaf ? <Link to={`/blog/detail/${key}`}>{title}</Link> : <>{title}</>}
      &nbsp;
    </span>;
    return (
      <>
        <span className={styles['title-render']}>
          {titleHolder}
          <Popconfirm
          icon={<></>}
          title="输入新名称"
          description={<Input placeholder="输入新名称" onChange={onEditNameChange}/>}
          onConfirm={editNameConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          okText="重命名"
          cancelText="取消">
            <Tooltip placement="bottom" title="重命名">
              <Button size={'small'} type="text" onClick={e => e?.stopPropagation()}><EditOutlined /></Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
          icon={<></>}
          title="输入文件名称"
          description={<Input placeholder="输入文件名称" onChange={onAddFileChange}/>}
          onConfirm={addFileConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          okText="新建文件"
          cancelText="取消">
            <Tooltip placement="bottom" title={isLeaf ? '无法在文件下添加文件' : '添加文件'}>
              <Button size={'small'} type="text" disabled={isLeaf} onClick={e => e?.stopPropagation()}><FileAddOutlined /></Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
          icon={<></>}
          title="输入文件夹名称"
          description={<Input placeholder="输入文件夹名称" onChange={onAddFolderChange}/>}
          onConfirm={addFolderConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          okText="新建文件夹"
          cancelText="取消">
            <Tooltip placement="bottom" title={isLeaf ? '无法在文件下添加文件夹' : '添加文件夹'}>
              <Button size={'small'} type="text" disabled={isLeaf} onClick={e => e?.stopPropagation()}><FolderAddOutlined /></Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
          title="删除当前及以下的所有文件和文件夹"
          description="是否确定删除当前及以下的所有文件和文件夹？"
          onConfirm={deleteDataConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          okText="确定"
          cancelText="取消">
            <Tooltip placement="bottom" title={isRoot ? '不可删除根目录' : '删除当前及以下的所有文件和文件夹'}>
              <Button danger size={'small'} type="text" disabled={isRoot} onClick={e => e?.stopPropagation()}><DeleteOutlined /></Button>
            </Tooltip>
          </Popconfirm>
        </span>
      </>
    );
  }
  const onChange: InputProps['onChange'] = e =>
  {
    const content = e.target.value;
    setInputContent(content);
    const tmp: React.Key[] = [];
    if (content === '')
    {
      setExpandedKeys(tmp);
      return;
    }
    function getSearchedKeys(u: TreeDataNode)
    {
      if ((u.title as string).includes(content))
      {
        tmp.push(u.key);
      }
      if (!u.children)return;
      for (let v of u.children)
      {
        getSearchedKeys(v);
      }
    }
    getSearchedKeys(directoryData[0]);
    setExpandedKeys(tmp);
  };
  const onExpand = (newExpandedKeys: React.Key[]) =>
  {
    setExpandedKeys(newExpandedKeys);
  };
  const onClose: AlertProps['onClose'] = () =>
  {
    dispatch(closeInfo());
  };
  let alertHolder =
  <Alert
  message="提示"
  description="可以通过拖拽文件或文件夹移动它们的位置"
  type="info"
  closable
  style={{marginBottom: '20px'}}
  onClose={onClose}
  showIcon/>;
  if (!showInfo)alertHolder = <></>;

  useEffect(() =>
  {
    console.log(expandedKeys);
    if (pageType === 'DirectoryPage')
    {
      dispatch(saveExpandedKeys(expandedKeys));
    }
  }, [expandedKeys]);

  return (
    <div className={styles['container']}>
      {/* 可选：只有选中时才会显示右侧的按钮 */}
      {alertHolder}
      <Input placeholder="输入以检索文件夹或文件" value={inputContent} onChange={onChange}/>
      <DirectoryTree
      showLine
      draggable
      selectable={pageType === 'DetailPage'}
      onDrop={onDropHelper(directoryData, (newDirectoryData: TreeDataNode[]) => dispatch(setDirectoryData(newDirectoryData)))}
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={directoryData}
      titleRender={titleRender}
      expandedKeys={expandedKeys}
      style={{marginTop: '20px'}}/>
    </div>
  );
};

export default Directory;