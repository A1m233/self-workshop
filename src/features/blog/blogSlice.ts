import { RootState } from "@/app/store";
import { swapNode } from "@/util/blog";
import { createSlice } from "@reduxjs/toolkit";
import { TreeDataNode } from "antd";

interface PayloadType
{
  node: TreeDataNode,
  title: string,
};
interface BlogContent
{
  lastModifiedTime: string,
  content: string,
};

export const blogSlice = createSlice(
{
  name: 'blog',
  initialState:
  {
    directoryData:
    [
      {
        title: '个人博客根目录',
        key: '0',
      },
    ] as TreeDataNode[],
    currentId: 1,
    showInfo: true,
    savedExpandedKeys: [] as string[],
    lastOpenedFile: '' as string,
    savedBlogContent: {} as Record<string, BlogContent>,
  },
  reducers:
  {
    setDirectoryData(state, action)
    {
      const newDirectoryData = action.payload;
      state.directoryData = newDirectoryData;
    },
    editTitle(state, action)
    {
      let { node, title } = action.payload as PayloadType;
      swapNode(state.directoryData[0], node, {...node, title});
    },
    addFile(state, action)
    {
      const { node, title } = action.payload as PayloadType;
      const to =
      {
        ...node,
        children: node.children ? [...node.children, { title, key: state.currentId.toString(), isLeaf: true, }] : [{ title, key: state.currentId.toString(), isLeaf: true, }]
      };
      swapNode(state.directoryData[0], node, to);
      state.currentId++;
    },
    addFolder(state, action)
    {
      const { node, title } = action.payload as PayloadType;
      const to =
      {
        ...node,
        children: node.children ? [...node.children, { title, key: state.currentId.toString() }] : [{ title, key: state.currentId.toString() }]
      };
      swapNode(state.directoryData[0], node, to);
      state.currentId++;
    },
    deleteData(state, action)
    {
      const toBeDeletedData = action.payload;
      let hasFound = false;
      function searchForDelete(u: TreeDataNode)
      {
        if (!u.children || hasFound)return;
        const index = u.children.findIndex(item => item.key === toBeDeletedData.key);
        if (index !== -1)
        {
          u.children = u.children.filter(item => item.key !== toBeDeletedData.key);
          hasFound = true;
          return;
        }
        u.children.forEach(v => searchForDelete(v));
      }
      searchForDelete(state.directoryData[0]);
    },
    closeInfo(state)
    {
      state.showInfo = false;
    },
    saveExpandedKeys(state, action)
    {
      const newExpandedKeys = action.payload;
      state.savedExpandedKeys = newExpandedKeys;
    },
    setLastOpenedFile(state, action)
    {
      const key = action.payload;
      state.lastOpenedFile = key.toString();
    },
    saveBlogContent(state, action)
    {
      const { key, blogContent } = action.payload;
      state.savedBlogContent[key] = blogContent;
    },
  }
});

export default blogSlice.reducer;

export const { setDirectoryData, editTitle, addFile, addFolder, deleteData, closeInfo,saveExpandedKeys, setLastOpenedFile, saveBlogContent } = blogSlice.actions;
export const selectDirectoryData = (state: RootState) => state.blog.directoryData;
export const selectShowInfo = (state: RootState) => state.blog.showInfo;
export const selectSavedExpandedKeys = (state: RootState) => state.blog.savedExpandedKeys;
export const selectLastOpenedFile = (state: RootState) => state.blog.lastOpenedFile;
export const selectSavedBlogContent = (state: RootState) => state.blog.savedBlogContent;