import React, { useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Modal,
  notification,
  Select,
  DatePicker,
} from 'antd';
import { useGetCollectionsQuery } from '../../store/actions/collection';
import { useUpdateProductMutation } from '../../store/actions/products';
import moment from 'moment';

const EditProduct: React.FC<{ product: any; onClose: () => void }> = ({
  product,
  onClose,
}) => {
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const { data: collectionsData } = useGetCollectionsQuery({});

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        name: product.productName,
        description: product.description,
        price: product.price,
        quantity: product.quantity,
        expireDate: moment(product.expireDate), // Assuming moment is imported for DatePicker
        category: product.category,
        collection: product.collection_id,
      });
    }
  }, [product, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await updateProduct({ id: product.id, formData: values }).unwrap();
      notification.success({ message: 'Product updated successfully' });
      onClose();
    } catch (error: any) {
      notification.error({
        message: error.data.message || 'Something went wrong',
      });
      console.error('Failed to update product:', error);
    }
  };

  return (
    <Modal visible={true} title="Edit Product" onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[
            { required: true, message: 'Please input the product name!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="collection"
          label="Collection"
          rules={[{ required: true, message: 'Please select a collection!' }]}
        >
          <Select placeholder="Select a collection">
            {collectionsData?.items.map((collection: any) => (
              <Select.Option key={collection.id} value={collection.id}>
                {collection.CollectionName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please input the quantity!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="expireDate"
          label="Expiration Date"
          rules={[
            { required: true, message: 'Please select the expiration date!' },
          ]}
        >
          <DatePicker className="w-full" />
        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={handleOk} loading={isUpdating}>
              Save Product
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProduct;
