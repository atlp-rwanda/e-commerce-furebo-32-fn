import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Space, Spin, Select, message } from 'antd';
import { fetchUsers, updateUserRole } from '../redux/slices/userSlice';
import { RootState, AppDispatch } from '../store/store';
import Sidebar from './Sidebar';
import '../styles/UserManagement.css';

const { Option } = Select;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone: string;
  [key: string]: any;
}

const UserManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.user);

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
        </Space>
      ),
    },
  ];

  const usersWithKeys = users.map((user) => ({
    ...user,
    key: user.id,
  }));

  if (loading) return <Spin />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className=" font-bold mb-4">User Management</h1>
        <Table columns={columns} dataSource={usersWithKeys as unknown as readonly User[]} />
      </div>
    </div>
  );
};

export default UserManagement;
