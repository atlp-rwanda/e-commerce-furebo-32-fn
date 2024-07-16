import { PenLine, Trash2 } from 'lucide-react';
import AddCollection from './addCollection';
import { Space, Spin, Table } from 'antd';
import { useGetCollectionsQuery } from '../../store/actions/collection';

const { Column } = Table;

function Collection() {
  const { data, isLoading, isFetching } = useGetCollectionsQuery({});

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
            loading={isLoading || isFetching}
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
                    <div className="flex justify-center items-center cursor-pointer hover:bg-red-100 hover:text-red-600 hover:border hover:border-red-600 border border-red-600 w-fit p-1 rounded-md bg-red-600 text-white">
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
