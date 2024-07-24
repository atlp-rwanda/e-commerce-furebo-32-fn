import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { TableColumnsType, TableProps, Spin } from 'antd';
import { useGetNotificationsQuery } from '../../store/actions/notifications';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface NotificationType {
  key: string;
  notification: string;
  description: string;
  read: boolean;
  createdAt: string;
}

const columns: TableColumnsType<NotificationType> = [
  { title: 'Notification', dataIndex: 'notification', key: 'notification' },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  {
    title: 'Status',
    dataIndex: 'read',
    key: 'read',
    render: (text) => (text ? 'Read' : 'Unread'),
  },
  { title: 'Time', dataIndex: 'createdAt', key: 'createdAt' },
];

const Notifications: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const { data, isLoading, isError } = useGetNotificationsQuery({});

  const start = () => {
    setLoading(true);
    // Simulate an ajax request
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<NotificationType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  if (isLoading) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Error loading notifications</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 className="text-xl font-bold">Notifications</h2>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data.notifications.map((notification: any) => ({
          key: notification.id,
          ...notification,
        }))}
      />
    </div>
  );
};

export default Notifications;
