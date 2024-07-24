import React, { useState, useEffect } from "react";
import { useFormik, FormikHelpers } from "formik";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Modal,
  Upload,
  Form,
  Input,
  UploadFile,
  UploadProps,
  Spin,
  Card,
  Avatar
} from 'antd';
import { MdEdit } from 'react-icons/md';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import * as Yup from 'yup';
import axios from 'axios';
import '../styles/profile.css'
interface ProfileData {
  image: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string | null;
  gender: string;
  preferredLanguage: string;
  preferredCurrency: string;
  whereYouLive: string;
  billingAddress: string;
  verified: boolean;
  role: string;
  profileURL: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProfileFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  gender: string;
  preferredLanguage: string;
  preferredCurrency: string;
  whereYouLive: string;
  billingAddress: string;
}

export const ViewProfile: React.FC = () => {
  const token = window.localStorage.getItem('token');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://e-commerce-furebo-32-bn-1.onrender.com/api/users/profile', {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile data');
      }

      const data = await response.json();
      setProfileData(data.data);
    } catch (error) {
      toast.error('Failed to fetch profile data');
    } finally {
      setLoading(false);
    }
  };

  const showModal = (): void => setIsModalOpen(true);
  const handleCancel = (): void => setIsModalOpen(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone is required'),
    birthDate: Yup.date().required('birth date is required'),
    gender: Yup.string(),
    preferredLanguage: Yup.string(),
    preferredCurrency: Yup.string(),
    whereYouLive: Yup.string(),
    billingAddress: Yup.string(),
  });

  const initialValues: ProfileFormValues = {
    firstName: profileData?.firstName || '',
    lastName: profileData?.lastName || '',
    phone: profileData?.phone || '',
    birthDate: profileData?.birthDate || '',
    gender: profileData?.gender || '',
    preferredLanguage: profileData?.preferredLanguage || '',
    preferredCurrency: profileData?.preferredCurrency || '',
    whereYouLive: profileData?.whereYouLive || '',
    billingAddress: profileData?.billingAddress || '',
  };

  const onSubmit = async (values: ProfileFormValues, { setSubmitting }: FormikHelpers<ProfileFormValues>): Promise<void> => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('firstName',formik.values.firstName)
      formData.append('lastName',formik.values.lastName)
      formData.append('phone',formik.values.phone)
      formData.append('birthDate',formik.values.birthDate)
      formData.append('gender',formik.values.gender)
      formData.append('preferredLanguage',formik.values.preferredLanguage)
      formData.append('preferredCurrency',formik.values.preferredCurrency)
      formData.append('whereYouLive',formik.values.whereYouLive)
      formData.append('billingAddress',formik.values.billingAddress)

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append('images', file.originFileObj);
        }
      });

     const response= await axios.patch('https://e-commerce-furebo-32-bn-1.onrender.com/api/users/update-profile',formData,{
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"}
        })

        if (response.status === 200) {
          setIsModalOpen(false);
          fetchProfileData(); 
          toast.success('Profile updated successfully');
        } else {
          toast.error('Failed to update profile. Please try again.');
        } 
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(`Failed to update profile: ${error.response.data.message || 'Unknown error occurred'}`);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });

  const handlePreview = async (file: UploadFile): Promise<void> => {
    const src = file.url || URL.createObjectURL(file.originFileObj as Blob);
    const imgWindow = window.open(src);
    if (imgWindow) {
      const img = new Image();
      img.src = src;
      imgWindow.document.write(img.outerHTML);
    }
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }): void => {
    setFileList(newFileList);
  };

  if (loading) {
    return <Spin size="large" />;
  }
  const birthDate = profileData?.birthDate;
  const formattedBirthDate = birthDate ? new Date(birthDate).toLocaleDateString() : 'Not set';
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <Card className="w-full max-w-2xl bg-primary-100" title="My Profile" extra={<Button icon={<MdEdit />} onClick={showModal}>Edit</Button>}>
        <div className="flex items-center mb-4">
          <Avatar size={64} icon={<UserOutlined />} src={profileData?.image || profileData?.profileURL} />
          <div className="ml-4">
            <h2>{`${profileData?.firstName} ${profileData?.lastName}`}</h2>
            <p>{profileData?.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4" id="profile">
          <div>
            <strong>Phone:</strong> {profileData?.phone}
          </div>
          <div>
            <strong>Birth Date:</strong> {formattedBirthDate}
          </div>
          <div>
            <strong>Gender:</strong> {profileData?.gender || 'Not set'}
          </div>
          <div>
            <strong>Preferred Language:</strong> {profileData?.preferredLanguage || 'Not set'}
          </div>
          <div>
            <strong>Preferred Currency:</strong> {profileData?.preferredCurrency || 'Not set'}
          </div>
          <div>
            <strong>Where You Live:</strong> {profileData?.whereYouLive || 'Not set'}
          </div>
          <div>
            <strong>Billing Address:</strong> {profileData?.billingAddress || 'Not set'}
          </div>
          <div>
            <strong>Role:</strong> {profileData?.role}
          </div>
          <div>
            <strong>Verified:</strong> {profileData?.verified ? 'Yes' : 'No'}
          </div>
          <div>
            <strong>Active:</strong> {profileData?.isActive ? 'Yes' : 'No'}
          </div>
        </div>
      </Card>

      <Modal open={isModalOpen} onCancel={handleCancel} title="Update Your Profile" footer={null}>
        <Form
          layout="vertical"
          onFinish={formik.handleSubmit}
          initialValues={formik.initialValues}
        >

            <Form.Item
                label="First Name"
                validateStatus={formik.errors.firstName && formik.touched.firstName ? 'error' : ''}
                help={formik.touched.firstName && formik.errors.firstName}
            >
                <Input
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                />
            </Form.Item>

            <Form.Item
                label="Last Name"
                validateStatus={formik.errors.lastName && formik.touched.lastName ? 'error' : ''}
                help={formik.touched.lastName && formik.errors.lastName}
            >
                <Input
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                />
            </Form.Item>

            <Form.Item
                label="Phone"
                validateStatus={formik.errors.phone && formik.touched.phone ? 'error' : ''}
                help={formik.touched.phone && formik.errors.phone}
            >
                <Input
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                />
            </Form.Item>

            <Form.Item
                label="Birth Date"
                validateStatus={formik.errors.birthDate && formik.touched.birthDate ? 'error' : ''}
                help={formik.touched.birthDate && formik.errors.birthDate}
            >
                <Input
                name="birthDate"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.birthDate}
                type="date"
                />
            </Form.Item>

            <Form.Item
                label="Gender"
                validateStatus={formik.errors.gender && formik.touched.gender ? 'error' : ''}
                help={formik.touched.gender && formik.errors.gender}
            >
                <Input
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                />
            </Form.Item>

            <Form.Item
                label="Preferred Language"
                validateStatus={formik.errors.preferredLanguage && formik.touched.preferredLanguage ? 'error' : ''}
                help={formik.touched.preferredLanguage && formik.errors.preferredLanguage}
            >
                <Input
                name="preferredLanguage"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.preferredLanguage}
                />
            </Form.Item>

            <Form.Item
                label="Preferred Currency"
                validateStatus={formik.errors.preferredCurrency && formik.touched.preferredCurrency ? 'error' : ''}
                help={formik.touched.preferredCurrency && formik.errors.preferredCurrency}
            >
                <Input
                name="preferredCurrency"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.preferredCurrency}
                />
            </Form.Item>

            <Form.Item
                label="Where You Live"
                validateStatus={formik.errors.whereYouLive && formik.touched.whereYouLive ? 'error' : ''}
                help={formik.touched.whereYouLive && formik.errors.whereYouLive}
            >
                <Input
                name="whereYouLive"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.whereYouLive}
                />
            </Form.Item>

            <Form.Item
                label="Billing Address"
                validateStatus={formik.errors.billingAddress && formik.touched.billingAddress ? 'error' : ''}
                help={formik.touched.billingAddress && formik.errors.billingAddress}
            >
                <Input
                name="billingAddress"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.billingAddress}
                />
            </Form.Item>


          <Form.Item label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length === 1 ? null : (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </div>
  );
};