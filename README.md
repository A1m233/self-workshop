# Self Workshop Monorepo

这是一个使用monorepo架构的前后端项目，包含前端React应用和后端Node.js API服务。

## 项目结构

```
self-workshop/
├── packages/
│   ├── frontend/          # React前端应用
│   │   ├── src/          # 源代码
│   │   ├── public/       # 静态资源
│   │   └── package.json  # 前端依赖
│   └── backend/          # Node.js后端API
│       ├── src/          # 源代码
│       │   ├── controllers/  # 控制器
│       │   ├── routes/       # 路由
│       │   ├── middleware/   # 中间件
│       │   └── types/        # 类型定义
│       └── package.json  # 后端依赖
├── package.json          # 根目录配置
└── README.md            # 项目说明
```

## 技术栈

### 前端 (packages/frontend)
- React 19
- TypeScript
- Vite
- Ant Design
- Redux Toolkit
- React Router

### 后端 (packages/backend)
- Node.js
- Express.js
- TypeScript
- CORS
- Helmet (安全中间件)

## 快速开始

### 安装依赖

```bash
# 安装所有依赖（包括前端和后端）
npm run install:all

# 或者分别安装
npm install
```

### 开发模式

```bash
# 同时启动前端和后端
npm run dev:all

# 或者分别启动
npm run dev:frontend  # 启动前端 (http://localhost:5173)
npm run dev:backend   # 启动后端 (http://localhost:3001)
```

### 构建

```bash
# 构建所有包
npm run build

# 或者分别构建
npm run build:frontend
npm run build:backend
```

### 代码检查

```bash
# 检查所有包的代码
npm run lint

# 或者分别检查
npm run lint:frontend
npm run lint:backend
```

## API 端点

### 健康检查
- `GET /health` - 服务器健康状态

### Todo API
- `GET /api/todos` - 获取所有todos
- `GET /api/todos/:id` - 获取单个todo
- `POST /api/todos` - 创建新todo
- `PUT /api/todos/:id` - 更新todo
- `DELETE /api/todos/:id` - 删除todo
- `GET /api/todos/stats/overview` - 获取统计信息

### Blog API
- `GET /api/blogs` - 获取所有blogs
- `GET /api/blogs/:id` - 获取单个blog
- `POST /api/blogs` - 创建新blog
- `PUT /api/blogs/:id` - 更新blog
- `DELETE /api/blogs/:id` - 删除blog

## 环境配置

### 后端环境变量

复制 `packages/backend/env.example` 为 `.env` 并配置：

```bash
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 开发说明

### 前端开发
- 前端代码位于 `packages/frontend/src/`
- 使用Vite作为构建工具
- 支持热重载

### 后端开发
- 后端代码位于 `packages/backend/src/`
- 使用nodemon进行开发
- 支持TypeScript

### 共享代码
- 可以在packages目录下创建shared包来共享代码
- 使用workspace协议进行包引用

## 部署

### 构建生产版本
```bash
npm run build
```

### 启动生产服务
```bash
# 前端
npm run preview --workspace=frontend

# 后端
npm run start --workspace=backend
```

## 脚本说明

- `npm run dev` - 启动前端开发服务器
- `npm run dev:all` - 同时启动前端和后端
- `npm run build` - 构建所有包
- `npm run lint` - 代码检查
- `npm run clean` - 清理构建文件
- `npm run clean:node_modules` - 清理所有node_modules
- `npm run clean:dist` - 清理所有dist目录

## 注意事项

1. 确保Node.js版本 >= 18
2. 后端默认运行在3001端口，前端在5173端口
3. 前端通过CORS与后端通信
4. 目前使用内存存储，生产环境需要配置数据库

# self-workshop
这个项目已经完成了初步的开发。

这个项目会集成多个模块，便利于使用者（主要是软件开发者）工作和学习使用。

目前已经实现的模块有待办事项列表、个人博客。

之后希望可以添加在线代码Playground、大模型对话。

## 已经实现的模块

#### 杂项

使用 [redux-persist](https://github.com/rt2zz/redux-persist) 和 [redux-state-sync](https://github.com/aohua/redux-state-sync) 实现了数据的持久化以及立即的跨页面更新。

### 待办事项模块

#### 首页提醒以及header提醒

![image-20250217021014474](./pic/image-20250217021014474.png)

#### 列表页面

![image-20250217021146247](./pic/image-20250217021146247.png)

#### 新建待办事项模态窗

![image-20250217021304122](./pic/image-20250217021304122.png)

#### 编辑待办事项模态窗

![image-20250217021339012](./pic/image-20250217021339012.png)

#### 根据待办事项内容检索的搜索框

![image-20250217021442223](./pic/image-20250217021442223.png)

#### 统计数据页面

![image-20250217021621314](./pic/image-20250217021621314.png)

#### 全局弹出即将到期提醒

![image-20250217205221986](./pic/image-20250217205221986.png)

### 个人博客模块

#### 方块颜色根据修改次数在取值范围内变化的[个人博客活动图](https://github.com/kevinsqi/react-calendar-heatmap)

![image-20250224014941688](./pic/image-20250224014941688.png)

#### 实现了检索和拖拽功能等目录基础功能的目录结构页（同时复用在了可展开的侧边栏中）

![image-20250224015155006](./pic/image-20250224015155006.png)

#### 包含[可切换预览模式与编辑模式的Markdown编辑器](https://github.com/imzbf/md-editor-rt)的个人博客详情页

##### 预览模式

![image-20250224020110868](./pic/image-20250224020110868.png)

##### 编辑模式

![image-20250224020132784](./pic/image-20250224020132784.png)