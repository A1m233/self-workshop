// Directory.tsx
import { FC, useEffect, useState } from "react";
import styles from './Directory.module.css';
import { Alert, AlertProps, Button, Input, InputProps, Popconfirm, Tooltip, TreeDataNode } from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { getUnderLeafKeys, onDropHelper } from "@/util/blog";
import { CloseOutlined, DeleteOutlined, EditOutlined, FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addFile, addFolder, closeInfo, deleteData, editTitle, saveExpandedKeys, selectDirectoryData, selectSavedExpandedKeys, selectShowInfo, setDirectoryData } from "./blogSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

interface PropsType
{
  pageType: 'DirectoryPage' | 'DetailPage',
  isVisible?: boolean,
};

const Directory: FC<PropsType> = props =>
{
  const { pageType, isVisible } = props;

  const directoryData = useSelector(selectDirectoryData);
  const showInfo = useSelector(selectShowInfo);
  const dispatch = useDispatch();

  const [inputContent, setInputContent] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(pageType === 'DirectoryPage' ? useSelector(selectSavedExpandedKeys) : []);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [editNameInputContent, setEditNameInputContent] = useState('');
  const [addFileInputContent, setAddFileInputContent] = useState('');
  const [addFolderInputContent, setAddFolderInputContent] = useState('');

  let editNameOpenTmp = {} as any;
  let addFileOpenTmp = {} as any;
  let addFolderOpenTmp = {} as any;
  let setEditNameOpenTmp = {} as any;
  let setAddFileOpenTmp = {} as any;
  let setAddFolderOpenTmp = {} as any;

  (function addState(node: TreeDataNode)
  {
    const { key } = node;
    editNameOpenTmp = {...editNameOpenTmp, [key.toString()]: false};
    addFileOpenTmp = {...addFileOpenTmp, [key.toString()]: false};
    addFolderOpenTmp = {...addFolderOpenTmp, [key.toString()]: false};
    setEditNameOpenTmp = {...setEditNameOpenTmp, [key.toString()]: (newState: any) => changeEditNameOpen({...editNameOpen, [key.toString()]: newState})};
    setAddFileOpenTmp = {...setAddFileOpenTmp, [key.toString()]: (newState: any) => changeAddFileOpen({...editNameOpen, [key.toString()]: newState})};
    setAddFolderOpenTmp = {...setAddFolderOpenTmp, [key.toString()]: (newState: any) => changeAddFolderOpen({...editNameOpen, [key.toString()]: newState})};
    if (!node.children)return;
    node.children.forEach(v => addState(v));
  })(directoryData[0]);

  const [editNameOpen, changeEditNameOpen] = useState(editNameOpenTmp);
  const [addFileOpen, changeAddFileOpen] = useState(addFileOpenTmp);
  const [addFolderOpen, changeAddFolderOpen] = useState(addFolderOpenTmp);
  const [setEditNameOpen] = useState(setEditNameOpenTmp);
  const [setAddFileOpen] = useState(setAddFileOpenTmp);
  const [setAddFolderOpen] = useState(setAddFolderOpenTmp);
  
  const { key: currentPageKey } = useParams();
  const nav = useNavigate();

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) =>
  {
    console.log('Trigger Select', keys, info);
    if (!info.node.isLeaf)
    {
      const underLeafKeys = getUnderLeafKeys(info.node.key);
      setExpandedKeys(expandedKeys.filter(key => !underLeafKeys.has(key)));
    }
    setAutoExpandParent(true);
    if (info.node.key !== currentPageKey && info.node.isLeaf)
    {
      nav(`/blog/detail/${info.node.key}`);
    }
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
      dispatch(deleteData(node));
    };
  };
  const pressEditNameEnterHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      editNameConfirmHelper(node)();
      setEditNameOpen[node.key.toString()](false);
    };
  };
  const pressAddFileEnterHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      console.log('*');
      addFileConfirmHelper(node)();
      setAddFileOpen[node.key.toString()](false);
    };
  };
  const pressAddFolderEnterHelper = (node: TreeDataNode) =>
  {
    return () =>
    {
      addFolderConfirmHelper(node)();
      setAddFolderOpen[node.key.toString()](false);
    };
  };
  function titleRender(nodeData: TreeDataNode)
  {
    const title = nodeData.title as string;
    const key = nodeData.key;
    const isRoot = key === '0';
    const isLeaf = nodeData.isLeaf;
    const isSearching = inputContent && title.includes(inputContent);
    const titleHolder =
    <span className={isSearching ? styles['searched-title'] : undefined}>
      &nbsp;
      {(isLeaf && pageType === 'DirectoryPage') ? <Link to={`/blog/detail/${key}`}>{title}</Link> : <>{title}</>}
      &nbsp;
    </span>;
    return (
      <>
        <span className={styles['title-render']}>
          {titleHolder}
          <Popconfirm
          icon={<></>}
          title="输入新名称"
          description={<Input placeholder="输入新名称" onChange={onEditNameChange} onPressEnter={pressEditNameEnterHelper(nodeData)} allowClear/>}
          onConfirm={editNameConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          open={editNameOpen[key.toString()]}
          onOpenChange={(newOpen) => setEditNameOpen[key.toString()](newOpen)}
          okText="重命名"
          cancelText="取消">
            <Tooltip placement="bottom" title="重命名">
              <Button size={'small'} type="text" onClick={e => e?.stopPropagation()}><EditOutlined /></Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
          icon={<></>}
          title="输入文件名称"
          description={<Input placeholder="输入文件名称" onChange={onAddFileChange} onPressEnter={pressAddFileEnterHelper(nodeData)} allowClear/>}
          onConfirm={addFileConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          open={addFileOpen[key.toString()]}
          onOpenChange={(newOpen) => setAddFileOpen[key.toString()](newOpen)}
          okText="新建文件"
          cancelText="取消">
            <Tooltip placement="bottom" title={isLeaf ? '无法在文件下添加文件' : '添加文件'}>
              <Button size={'small'} type="text" disabled={isLeaf} onClick={e => e?.stopPropagation()}><FileAddOutlined /></Button>
            </Tooltip>
          </Popconfirm>
          <Popconfirm
          icon={<></>}
          title="输入文件夹名称"
          description={<Input placeholder="输入文件夹名称" onChange={onAddFolderChange} onPressEnter={pressAddFolderEnterHelper(nodeData)} allowClear/>}
          onConfirm={addFolderConfirmHelper(nodeData)}
          onPopupClick={e => e?.stopPropagation()}
          open={addFolderOpen[key.toString()]}
          onOpenChange={(newOpen) => setAddFolderOpen[key.toString()](newOpen)}
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
    setAutoExpandParent(true);
  };
  const onExpand = (newExpandedKeys: React.Key[]) =>
  {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
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
  closable={{closeIcon: <span className={styles['close-button']}><CloseOutlined /><span style={{textAlign: 'center'}}>不再提示我</span></span>}}
  style={{marginBottom: '20px'}}
  onClose={onClose}
  showIcon/>;
  if (!showInfo)alertHolder = <></>;

  useEffect(() =>
  {
    if (pageType === 'DirectoryPage')
    {
      dispatch(saveExpandedKeys(expandedKeys));
    }
  }, [expandedKeys]);

  useEffect(() =>
  {
    if (pageType === 'DetailPage')
    {
      setExpandedKeys([currentPageKey as string]);
    }
    console.log('current page key: ', currentPageKey);
  }, [currentPageKey]);

  return (
    <div className={styles['container']} style={{display: isVisible ? 'block' : 'none'}}>
      {/* 可选：只有选中时才会显示右侧的按钮 */}
      {alertHolder}
      <Input placeholder="输入以检索文件夹或文件" value={inputContent} onChange={onChange} allowClear/>
      <DirectoryTree
      showLine
      draggable
      selectable={pageType === 'DetailPage'}
      selectedKeys={pageType === 'DetailPage' ? [currentPageKey as string] : []}
      onDrop={onDropHelper(directoryData, (newDirectoryData: TreeDataNode[]) => dispatch(setDirectoryData(newDirectoryData)))}
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={directoryData}
      titleRender={titleRender}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      style={{marginTop: '20px'}}/>
    </div>
  );
};

export default Directory;