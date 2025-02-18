import todoReducer from "@/features/todo/todoSlice";
import blogReducer from "@/features/blog/blogSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers(
{ 
  todo: todoReducer,
  blog: blogReducer,
});

// 持久化配置
const persistConfig =
{
  key: 'root',
  storage,
  // whitelist: ['todo'], // 需要持久化保存的模块，默认保存所有模块（语义：白名单）
  blacklist: [], // 不需要持久化保存的模块，默认不排除任何模块（语义：黑名单），如果需要数据重置到初始状态，可以将它加入blacklist后删除
};
// 创建持久化后的reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore(
{
  reducer: persistedReducer,
  // 配置中间件：如果使用redux-persist，则需要设置为false，否则控制台报错（非序列化数据）
  middleware: (getDefaultMiddleware) => getDefaultMiddleware
  ({
    serializableCheck: false,
  }),
});

// 导出store和持久化后的store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;