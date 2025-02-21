import { createBrowserRouter } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import StatisticsPage from "@/pages/todo/StatisticsPage";
import FinishedTodosPage from "@/pages/todo/FinishedTodosPage";
import UnfinishedTodosPage from "@/pages/todo/UnfinishedTodosPage";
import DueTodosPage from "@/pages/todo/DueTodosPage";
import ExpiredTodosPage from "@/pages/todo/ExpiredTodosPage";
import AllTodosPage from "@/pages/todo/AllTodosPage";
import DirectoryPage from "@/pages/blog/DirectoryPage";
import DetailPage from "@/pages/blog/DetailPage";
import MainLayout from "@/layouts/MainLayout";
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter(
[
  {
    element: <MainLayout />,
    children:
    [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/todo/statistics',
        element: <StatisticsPage />,
      },
      {
        path: '/todo/list/all',
        element: <AllTodosPage />,
      },
      {
        path: '/todo/list/finished',
        element: <FinishedTodosPage />,
      },
      {
        path: '/todo/list/unfinished',
        element: <UnfinishedTodosPage />,
      },
      {
        path: '/todo/list/due',
        element: <DueTodosPage />,
      },
      {
        path: '/todo/list/expired',
        element: <ExpiredTodosPage />,
      },
      {
        path: '/blog/directory',
        element: <DirectoryPage />,
      },
      {
        path: '/blog/detail/:key',
        element: <DetailPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]
  }
]);

export default router;