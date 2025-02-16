import { FC } from 'react';
import router from './router';
import { RouterProvider } from 'react-router-dom';
import './index.css';

const App: FC = () => {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
