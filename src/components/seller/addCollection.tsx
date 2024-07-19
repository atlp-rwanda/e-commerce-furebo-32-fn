import React, { useState } from 'react';
import { Button, Form, FormInstance, Input, Modal, notification, Space } from 'antd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind CSS is imported
import { useCreateCollectionMutation } from '../../store/actions/collection';

interface SubmitButtonProps {
  form: FormInstance;
  handleOk: (name: string, description: string) => void;
  loading: boolean; // Add the loading prop here
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  handleOk,
  loading,
  children,
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onClick = () => {
    form.validateFields().then(() => {
      const name = form.getFieldValue('name');
      const description = form.getFieldValue('description');
      handleOk(name, description);
    });
  };

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onClick={onClick}
      loading={loading} // Pass the loading prop to the Button component
    >
      {children}
    </Button>
  );
};

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [createCollection, { isLoading }] = useCreateCollectionMutation();

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (name: string, description: string) => {
    console.log(name, description);
    try {
      await createCollection({ CollectionName: name, description });
    notification.success({ message: 'Collection created successfully' });
      setOpen(false);
      form.resetFields();
    } catch (error:any) {
      notification.error({ message: "Something went wrong!" });
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  return (
    <>
      <div
        onClick={showModal}
        className="bg-primary-300 cursor-pointer hover:text-primary-300 hover:bg-primary-50 border border-primary-300 h-full p-2 my-2 rounded-md text-white"
      >
        <AddCircleOutlineIcon />
      </div>
      <Modal
        open={open}
        title="Add Collection"
        onCancel={handleCancel}
        footer={null}
        style={{ zIndex: 10000 }}
        className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
      >
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton form={form} loading={isLoading} handleOk={handleOk}>
                Submit
              </SubmitButton>
              <Button onClick={handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default App;
