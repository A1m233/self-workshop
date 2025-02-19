import { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Result, Button } from 'antd'

const NotFoundPage: FC = () => {
  const nav = useNavigate()
  const {pathname} = useLocation();

  let subTitle = '抱歉，您访问的页面不存在';
  let extra =
  <Button type="primary" onClick={() => nav('/')}>
    返回首页
  </Button>;
  if (pathname === '/blog/detail')
  {
    subTitle = '由于你还没有进入过任何一个博客，无法确认要查看详情的博客，你可以：';
    extra =
    <Button type="primary" onClick={() => nav('/blog/directory')}>
      转到目录结构页面以查看或编辑指定的博客
    </Button>;
  }

  return (
    <Result
    status="404"
    subTitle={subTitle}
    extra={extra}/>
  );
}

export default NotFoundPage;
