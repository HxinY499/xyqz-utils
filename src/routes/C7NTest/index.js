import React, { useMemo } from 'react';
import { DataSet, Table } from 'choerodon-ui/pro';

const ds = () => ({
  transport: {
    read: config => {
      return {
        url: `http://gateway.clmp-dev.csleasing.com.cn/cloa-invoice-folder/v1/3/invoice/image/197400`,
        method: 'POST',
      };
    },
  },
  fields: [
    {
      name: 'name',
      label: '姓名',
      type: 'string',
    },
    {
      name: 'age',
      label: '年龄',
      type: 'number',
    },
    {
      name: 'gender',
      label: '性别',
      type: 'string',
    },
  ],
  queryFields: [
    {
      name: 'name',
      label: '姓名',
      type: 'string',
    },
    {
      name: 'age',
      label: '年龄',
      type: 'number',
    },
    {
      name: 'gender',
      label: '性别',
      type: 'string',
    },
  ],
  events: {},
});

// const data = [
//   {
//     name: "何欣宇",
//     age: 20,
//     gender: "男",
//   },
//   {
//     name: "XXX",
//     age: 21,
//     gender: "女",
//   },
//   {
//     name: "QQQ",
//     age: 22,
//     gender: "男",
//   },
// ];

function C7NTest() {
  const tableDs = useMemo(() => new DataSet(ds()), []);

  const column = useMemo(
    () => [{ name: 'name' }, { name: 'age' }, { name: 'gender' }],
    []
  );

  return (
    <>
      <Table dataSet={tableDs} columns={column} />
    </>
  );
}

export default C7NTest;
