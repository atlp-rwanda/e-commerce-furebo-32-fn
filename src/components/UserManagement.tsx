import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Spin, Select, message, Popconfirm, Button, Modal, Form, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { fetchUsers, updateUserRole } from '../redux/slices/userSlice';
import { RootState, AppDispatch } from '../store/store';
import { useUpdateUserStatusMutation } from '../store/actions/user';
import '../styles/UserManagement.css';

const { Option } = Select;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;  // Use isActive boolean
  [key: string]: any;
}

const UserManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deactivationReason, setDeactivationReason] = useState('');

  const [updateUserStatus, { isLoading: isUpdating }] = useUpdateUserStatusMutation();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleRoleChange = (userId: string, role: string) => {
    dispatch(updateUserRole({ userId, role })).then((result) => {
      if (updateUserRole.fulfilled.match(result)) {
        message.success('User role updated successfully');
      } else if (updateUserRole.rejected.match(result)) {
        message.error('Failed to update user role');
      }
    });
  };

  const handleDeactivate = (userId: string) => {
    setSelectedUserId(userId);
    setIsModalVisible(true);
  };

  const handleModalOk = async () => {
    if (selectedUserId) {
      try {
        const res = await updateUserStatus({ id: selectedUserId, activationReason: deactivationReason }).unwrap();
        console.log(res);
        message.success('User Status Updated successfully');
      } catch (error) {
        message.error('Failed to deactivate user');
      }finally {
        setIsModalVisible(false);
        setSelectedUserId(null);
        setTimeout(() => {
          window.location.reload(); 
        }, 1500); 
      }
    }
    setIsModalVisible(false);
    setDeactivationReason('');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setDeactivationReason('');
  };

  const columns = [
    {
      title: 'No',
      render: (_text: any, _record: User, index: number) => <span>{index + 1}</span>,
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: any, record: User) => (
        <Space size="middle">
          <Select
            value={record.role}
            onChange={(value) => handleRoleChange(record.id, value)}
            className="p-1 rounded"
          >
            <Option value="admin">Admin</Option>
            <Option value="seller">Seller</Option>
            <Option value="buyer">Buyer</Option>
          </Select>
          <Popconfirm
            title={`Are you sure you want to ${record.isActive ? 'deactivate' : 'activate'} this user?`}
            onConfirm={() => handleDeactivate(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              icon={record.isActive ? <CloseCircleOutlined /> : <VscActivateBreakpoints />}
              className={`flex items-center ${record.isActive ? 'bg-red-500' : 'bg-green-500'}`}
              
            >
              {record.isActive ? 'Disable Acc' : 'Re-Activate'}
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const usersWithKeys = users.map((user) => ({
    ...user,
    key: user.id,
  }));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" className="text-6xl" />
      </div>
    );
  }
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h1 className="font-bold mb-4">Users Management</h1>
        <Table
          columns={columns}
          dataSource={usersWithKeys as unknown as readonly User[]}
          pagination={{ pageSize: 6 }}
          rowClassName={(record: User) => (!record.isActive ? 'bg-red-100' : '')}  // Apply red background for inactive users
        />
      </div>
      <Modal
        title="Acitivate/Deactivate User"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        confirmLoading={isUpdating}
      >
        <Form layout="vertical">
          <Form.Item label="Enter The Reason">
            <Input.TextArea
              value={deactivationReason}
              onChange={(e) => setDeactivationReason(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
