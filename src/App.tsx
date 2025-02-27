import { FC, Suspense } from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { Spin } from 'antd';

const App: FC = () => {

  return (
    <>
      <Suspense fallback={<Spin />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

export default App;
