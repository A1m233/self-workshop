import { selectDirectoryData } from "@/features/blog/blogSlice";
import { TreeProps, TreeDataNode } from "antd";
import lodash from 'lodash';
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function onDropHelper(gData: any, setGData: any) {
  const onDrop: TreeProps['onDrop'] = (info) =>
  {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1
  
    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = lodash.cloneDeep(gData);
  
    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    let isCancelled = false;
    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        if (item.isLeaf)
        {
          alert('不可将文件或文件夹作为一个文件的子节点');
          isCancelled = true;
          return;
        }
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    if (isCancelled)return;
    setGData(data);
    console.log(data);
  };
  return onDrop;
};

export function swapNode(u: TreeDataNode, from: TreeDataNode, to: TreeDataNode)
{
  if (u.key === from.key)
  {
    for (let key in to)
    {
      (u as any)[key] = (to as any)[key];
    }
    return;
  }
  if (!u.children) return;
  u.children.forEach(v => swapNode(v, from, to));
};

export function searchPath(key: React.Key)
{
  let res;
  function dfs(u: TreeDataNode, path: Array<object> = [])
  {
    const { title } = u;
    if (path.length)path.push({title});
    else path.push({title: <Link to="/blog/directory">{title as any}</Link>})
    if (u.key === key)
    {
      res = path;
      return;
    }
    if (!u.children) return;
    u.children.forEach(v =>
    {
      let newPath = [...path];
      dfs(v, newPath);
    });
  }
  dfs(useSelector(selectDirectoryData)[0]);
  return res;
};