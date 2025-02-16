import { DatePicker, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, editTodo } from "./todoSlice";
import dayjs from "dayjs";

interface PropsType
{
  expiration?: number,
  content?: string,
  id?: number,
};
export interface TodoModalHandles
{
  showModal: () => void;
};

const TodoModal = forwardRef<TodoModalHandles, PropsType>((props, ref) =>
{
  const { expiration, content, id } = props;

  const actionType = id === undefined ? '新建' : '编辑';

  const initialValues =
  {
    expiration: expiration !== undefined ? dayjs(expiration) : undefined,
    content: content !== undefined ? content : undefined,
  };

  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useImperativeHandle(ref, () =>
  ({
    showModal,
  }));

  function onFinish(fieldsValue: any)
  {
    if (actionType === '新建')
    {
      dispatch(addTodo(
      {
        isFinished: false,
        content: fieldsValue['content'],
        expiration: fieldsValue['expiration'].valueOf(),
      }));
    }
    else
    {
      dispatch(editTodo(
      {
        id,
        content: fieldsValue['content'],
        expiration: fieldsValue['expiration'].valueOf(),
      }));
    }
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
      messageApi.success('成功' + actionType + '待办事项');
    });
  };
  function handleCancel()
  {
    setIsModalOpen(false);
    messageApi.info('取消' + actionType + '待办事项');
  };

  return (
    <>
      {contextHolder}
      <Modal
      title={'填写内容以' + actionType + '待办事项'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={actionType + '待办事项'}
      cancelText={'取消' + actionType + '待办事项'}
      afterClose={() => form.resetFields()}>
        <Form
        name="addTodo"
        form={form}
        onFinish={onFinish}
        style={{'margin': '20px'}}
        initialValues={initialValues}>
          <Form.Item
          label="到期时间"
          name="expiration"
          rules={[{ required: true, message: '请选择待办事项到期时间' }]}>
            <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="请选择待办事项到期时间"
            needConfirm={false}/>
          </Form.Item>
          <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入待办事项内容' }]}>
            <Input.TextArea placeholder="请输入待办事项内容" allowClear/>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
});

export default TodoModal;