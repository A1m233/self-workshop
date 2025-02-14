import type { TodoType } from "@/types/todo";
import { Button, Card, DatePicker, Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import Todo from "./Todo";
import styles from './TodoList.module.css';
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

interface PropsType
{
  pageType: string,
  todoList: TodoType[],
};

const TodoList: FC<PropsType> = props =>
{
  const { pageType, todoList } = props;

  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  function onFinish(fieldsValue: any)
  {
    dispatch(addTodo(
    {
      isFinished: false,
      content: fieldsValue['content'],
      expiration: fieldsValue['expiration'].valueOf(),
    }));
  }
  function showModal()
  {
    setIsModalOpen(true);
  };
  function handleOk()
  {
    form.validateFields().then(() =>
    {
      form.submit();
      setIsModalOpen(false);
    });
  };
  function handleCancel()
  {
    setIsModalOpen(false);
  };

  return (
    <Card
    title={pageType + '待办事项列表'}
    extra={<Input placeholder="输入待办事项内容以检索" />}>
      <div className={styles['card-body']}>
        <Button type="primary" onClick={showModal}>新建待办事项</Button>
        <Modal
        title="填写内容以新建待办事项"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="添加待办事项"
        cancelText="取消添加待办事项"
        afterClose={() => form.resetFields()}>
          <Form
          name="addTodo"
          form={form}
          onFinish={onFinish}
          style={{'margin': '20px'}}>
            <Form.Item
            label="到期时间"
            name="expiration"
            rules={[{ required: true, message: '请选择待办事项到期时间' }]}>
              <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="请选择待办事项到期时间"/>
            </Form.Item>
            <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入待办事项内容' }]}>
              <Input placeholder="请输入待办事项内容"/>
            </Form.Item>
          </Form>
        </Modal>
        <div className={styles['todolist-wrapper']}>
          {
            todoList.map(todo =>
            {
              return <Todo todo={todo} key={todo.id}/>
            })
          }
        </div>
      </div>
    </Card>
  );
};

export default TodoList;