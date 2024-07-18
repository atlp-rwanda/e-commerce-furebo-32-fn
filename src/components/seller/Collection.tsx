import { PenLine, Trash2 } from 'lucide-react';
import AddCollection from './addCollection';
import EditCollection from './EditCollection';
import { Space, Spin, Table, Modal, notification } from 'antd';
import {
  useGetCollectionsQuery,
  useDeleteCollectionMutation,
} from '../../store/actions/collection';

const { Column } = Table;
const { confirm } = Modal;

function Collection() {
  const { data, isLoading, isFetching } = useGetCollectionsQuery({});
  const [deleteCollection, { isLoading: isDeleting }] =
    useDeleteCollectionMutation();
  const [editingCollection, setEditingCollection] = useState(null);

const showDeleteConfirm = (record: any) => {
  confirm({
    title: 'Are you sure you want to delete this collection?',
    content: 'This action cannot be undone.',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk: async () => {
      try {
        await deleteCollection({ id: record.id }).unwrap();
        notification.success({ message: 'Collection deleted successfully' });
      } catch (error: any) {
        notification.error({
          message: error.data.message || 'Something went wrong',
        });
        console.error('Failed to delete collection:', error);
      }
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};


  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center px-2 rounded-md border border-primary-300">
        <span className="text-black text-xl">Collection</span>
        <AddCollection />
      </div>
      <div className="py-2 flex flex-wrap gap-2 w-full justify-center items-center">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Table
            dataSource={data.items}
            loading={isLoading || isFetching || isDeleting}
            className="w-full"
            pagination={{ pageSize: 6 }} // Set pageSize to 10 items per page
          >
            <Column title="Name" dataIndex="CollectionName" key="name" />
            <Column
              title="Description"
              dataIndex="description"
              key="description"
            />
            <Column title="UpdatedAt" dataIndex="updatedAt" key="updatedAt" />
            <Column title="CreatedAt" dataIndex="createdAt" key="createdAt" />
            <Column
              title="Action"
              key="action"
              render={(_: any) => (
                <Space size="middle">
                  <div className="flex gap-1 justify-end">
                    <div className="flex justify-center items-center cursor-pointer hover:bg-primary-50 hover:text-primary-300 hover:border hover:border-primary-300 border border-primary-300 bg-primary-300 w-fit p-1 rounded-md text-white">
                      <PenLine width={15} height={15} />
                    </div>
                    <div
                      className="flex justify-center items-center cursor-pointer hover:bg-red-100 hover:text-red-600 hover:border hover:border-red-600 border border-red-600 w-fit p-1 rounded-md bg-red-600 text-white"
                      onClick={() => showDeleteConfirm(record)}
                    >
                      <Trash2 width={15} height={15} />
                    </div>
                  </div>
                </Space>
              )}
            />
          </Table>
        )}
      </div>
    </div>
  );
}

export default Collection;
