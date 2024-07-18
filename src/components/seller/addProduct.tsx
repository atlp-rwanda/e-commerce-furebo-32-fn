import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Space,
  Upload,
  DatePicker,
  Select,
  notification,
} from 'antd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ImgCrop from 'antd-img-crop';
import type { UploadFile, UploadProps } from 'antd';
import { useCreateProductMutation } from '../../store/actions/products';
import { useGetCollectionsQuery } from '../../store/actions/collection';

interface SubmitButtonProps {
  form: FormInstance;
  handleOk: (name: string, description: string, otherFields: any) => void;
  loading: boolean;
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
      const otherFields = form.getFieldsValue([
        'price',
        'quantity',
        'expireDate',
        'category',
        'collection',
      ]);
      handleOk(name, description, otherFields);
    });
  };

  return (
    <Button
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      onClick={onClick}
      loading={loading}
    >
      {children}
    </Button>
  );
};

const AddProduct: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data } = useGetCollectionsQuery({});
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (data && data.items) {
      setCollections(data.items);
    }
  }, [data]);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" />`);
  };

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async (
    name: string,
    description: string,
    otherFields: any,
  ) => {
    const formData = new FormData();
    formData.append('productName', name);
    formData.append('description', description);
    Object.keys(otherFields).forEach((key) => {
      formData.append(key, otherFields[key]);
    });
    fileList.forEach((file) => {
      if (file.originFileObj) {
        formData.append('images', file.originFileObj);
      }
    });
    formData.append('collection_id', otherFields.collection);
    try {
      await createProduct({ formData }).unwrap();
      notification.success({ message: 'Product created successfully' });
      setOpen(false);
      form.resetFields();
      setFileList([]);
    } catch (error:any) {
        notification.error({
          message: error.data.message || 'Something went wrong',
        });
      console.error('Failed to create product:', error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
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
        title="Add Product"
        onCancel={handleCancel}
        footer={null}
        style={{ zIndex: 10000 }}
      >
        <Form
          form={form}
          className="flex gap-2 flex-wrap"
          name="validateOnly"
          layout="vertical"
        >
          <Form.Item
            className="w-[48%]"
            name="name"
            label="Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-[48%]"
            name="collection"
            label="Collection"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select a collection">
              {collections.map((collection: any) => (
                <Select.Option key={collection.id} value={collection.id}>
                  {collection.CollectionName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            className="w-[48%]"
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-[48%]"
            name="price"
            label="Price"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="w-[48%]"
            name="quantity"
            label="Quantity"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="expireDate"
            label="Expiration Date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <ImgCrop rotationSlider>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 8 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item>
            <Space>
              <SubmitButton
                form={form}
                loading={isCreating}
                handleOk={handleOk}
              >
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

export default AddProduct;
