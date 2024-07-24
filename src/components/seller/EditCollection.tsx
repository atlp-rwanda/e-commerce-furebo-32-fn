import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import { useUpdateCollectionMutation } from '../../store/actions/collection';

const EditCollection: React.FC<{ collection: any; onClose: () => void }> = ({
  collection,
  onClose,
}) => {
  const [updateCollection, { isLoading: isUpdating }] =
    useUpdateCollectionMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      CollectionName: collection.CollectionName,
      description: collection.description,
    });
  }, [collection, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateCollection({ id: collection.id, ...values }).unwrap();
      notification.success({ message: 'Collection updated successfully' });
      onClose();
    } catch (error: any) {
      notification.error({
        message: error.data.message || 'Something went wrong',
      });
      console.error('Failed to update collection:', error);
    }
  };

  return (
    <Modal open={true} title="Edit Collection" onCancel={onClose} footer={null}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          CollectionName: collection.CollectionName,
          description: collection.description,
        }}
      >
        <Form.Item
          name="CollectionName"
          label="Collection Name"
          rules={[
            { required: true, message: 'Please input the collection name!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleOk} loading={isUpdating}>
              Save Collection
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditCollection;
