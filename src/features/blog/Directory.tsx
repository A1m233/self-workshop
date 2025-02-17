import { FC, useState } from "react";
import styles from './Directory.module.css';
import { Button, Tooltip, TreeDataNode } from "antd";
import { DirectoryTreeProps } from "antd/es/tree";
import DirectoryTree from "antd/es/tree/DirectoryTree";
import { onDropHelper } from "@/util/blog";
import { DeleteOutlined, FileAddOutlined, FolderAddOutlined } from "@ant-design/icons";

const defaultData: TreeDataNode[] = 
[
  {
    "title": "0-0",
    "key": "0-0",
    "children":
    [
      {
        "title": "0-0-0",
        "key": "0-0-0",
        "children":
        [
          {
            "title": "0-0-0-0",
            "key": "0-0-0-0"
          },
          {
            "title": "0-0-0-1",
            "key": "0-0-0-1"
          },
          {
            "title": "0-0-0-2",
            "key": "0-0-0-2",
            "isLeaf": true
          }
        ]
      },
      {
        "title": "0-0-1",
        "key": "0-0-1",
        "children":
        [
          {
            "title": "0-0-1-0",
            "key": "0-0-1-0"
          },
          {
            "title": "0-0-1-1",
            "key": "0-0-1-1"
          },
          {
            "title": "0-0-1-2",
            "key": "0-0-1-2",
            "isLeaf": true
          }
        ]
      },
      {
        "title": "0-0-2",
        "key": "0-0-2",
        "isLeaf": true
      }
    ]
  },
  {
      "title": "0-1",
      "key": "0-1",
      "children": [
          {
              "title": "0-1-0",
              "key": "0-1-0",
              "children": [
                  {
                      "title": "0-1-0-0",
                      "key": "0-1-0-0"
                  },
                  {
                      "title": "0-1-0-1",
                      "key": "0-1-0-1"
                  },
                  {
                      "title": "0-1-0-2",
                      "key": "0-1-0-2",
                      "isLeaf": true
                  }
              ]
          },
          {
              "title": "0-1-1",
              "key": "0-1-1",
              "children": [
                  {
                      "title": "0-1-1-0",
                      "key": "0-1-1-0"
                  },
                  {
                      "title": "0-1-1-1",
                      "key": "0-1-1-1"
                  },
                  {
                      "title": "0-1-1-2",
                      "key": "0-1-1-2",
                      "isLeaf": true
                  }
              ]
          },
          {
              "title": "0-1-2",
              "key": "0-1-2",
              "isLeaf": true
          }
      ]
  },
];

const Directory: FC = () =>
{
  const [gData, setGData] = useState(defaultData);

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) =>
  {
    console.log('Trigger Select', keys, info);
  }; 
  function titleRender(nodeData: TreeDataNode)
  {
    const title = nodeData.title;
    return (
      <>
        <span className={styles['title-render']}>
          <span>{title as any}&nbsp;</span>
          <Tooltip title="添加文件">
            <Button size={'small'} type="text"><FileAddOutlined /></Button>
          </Tooltip>
          <Tooltip title="添加文件夹">
            <Button size={'small'} type="text"><FolderAddOutlined /></Button>
          </Tooltip>
          <Tooltip title="删除当前及以下的所有文件和文件夹">
            <Button size={'small'} type="text"><DeleteOutlined /></Button>
          </Tooltip>
        </span>
      </>
    );
  }

  return (
    <div className={styles['container']}>
      <DirectoryTree
      showLine
      multiple
      draggable
      onDrop={onDropHelper(gData, setGData)}
      onSelect={onSelect}
      treeData={gData}
      titleRender={titleRender}/>
    </div>
  );
};

export default Directory;