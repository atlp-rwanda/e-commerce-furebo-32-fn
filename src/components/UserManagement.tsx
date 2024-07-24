import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Spin, Select, message, Popconfirm, Button, Modal, Form, Input } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { VscActivateBreakpoints } from 'react-icons/vsc';
import { fetchUsers, updateUserRole, updateUserPermissions } from '../redux/slices/userSlice';
import { RootState, AppDispatch } from '../store/store';
import '../styles/UserManagement.css';

const { Option } = Select;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  isActive: boolean;
  permissions?: string[];  
  [key: string]: any;
}

const UserManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);  
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [deactivationReason, setDeactivationReason] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);  

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
        
        message.success('User Status Updated successfully');
      } catch (error) {
        message.error('Failed to deactivate user');
      } finally {
        setIsModalVisible(false);
        setSelectedUserId(null);
        setDeactivationReason('');
      }
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setDeactivationReason('');
  };

  const handlePermissionModalOk = async () => {
    if (selectedUserId) {
      try {
        await dispatch(updateUserPermissions({ userId: selectedUserId, permissions: selectedPermissions })).unwrap();
        message.success('User permissions updated successfully');
      } catch (error) {
        message.error('Failed to update user permissions');
      } finally {
        setPermissionModalVisible(false);
        setSelectedUserId(null);
        setSelectedPermissions([]);
      }
    }
  };

  const handlePermissionModalCancel = () => {
    setPermissionModalVisible(false);
    setSelectedPermissions([]);
  };

  const handlePermissionsChange = (value: string[]) => {
    setSelectedPermissions(value);
  };

  const columns = [
    {
      title: 'No',
      render: (_text: any, _record: User, index: number) => <span>{index + 1}</span>,
      width: 80,
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string, user: User) => (
        <Select
          value={role}
          onChange={(value) => handleRoleChange(user.id, value)}
          className="p-1 rounded"
          style={{ width: 120 }}
        >
          <Option value="admin">Admin</Option>
          <Option value="seller">Seller</Option>
          <Option value="buyer">Buyer</Option>
        </Select>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <div>
          {permissions?.join(', ') || 'No permissions'}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_text: any, record: User) => (
        <Space size="middle">
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
          <Button onClick={() => {
            setSelectedUserId(record.id);
            setPermissionModalVisible(true);
            setSelectedPermissions(record.permissions || []);
          }}>
            Manage Permissions
          </Button>
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
    <div className="p-4">
      <h1 className="font-bold mb-4">Users Management</h1>
      <Table
        columns={columns}
        dataSource={usersWithKeys as unknown as readonly User[]}
        pagination={{ pageSize: 6 }}
        rowClassName={(record: User) => (!record.isActive ? 'bg-red-100' : '')}
        scroll={{ x: 'max-content' }}  // Ensures the table does not exceed viewport width
        bordered
      />
      <Modal
        title="Activate/Deactivate User"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
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
      <Modal
        title="Manage Permissions"
        visible={permissionModalVisible}
        onOk={handlePermissionModalOk}
        onCancel={handlePermissionModalCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Permissions">
            <Select
              mode="multiple"
              value={selectedPermissions}
              onChange={handlePermissionsChange}
              className="w-full"
            >
              <Option value="view_users">View Users</Option>
              <Option value="edit_users">Edit Users</Option>
              <Option value="delete_users">Delete Users</Option>
              <Option value="view_product">View Product</Option>
              <Option value="edit_product">Edit Product</Option>
              <Option value="delete_product">Delete product</Option>
              <Option value="view_cart">View cart</Option>
              <Option value="edit_cart">Edit cart</Option>
              <Option value="delete_cart">Delete cart</Option>
              <Option value="add_to_cart">Add Item to cart</Option>
              <Option value="create_category">Create Category</Option>
              <Option value="add_product_to_category">Add product to category</Option>
              {/* Add other permissions as needed */}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
