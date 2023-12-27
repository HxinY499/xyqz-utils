import { DataSet } from 'choerodon-ui/pro';
import {
  DataSetSelection,
  FieldType,
} from 'choerodon-ui/pro/lib/data-set/enum';

// 附件列表
export const noticeFileDataSet = (): DataSet =>
  new DataSet({
    // primaryKey: 'id',
    paging: false,
    fields: [
      { name: 'url', type: FieldType.string, label: '附件地址' },
      {
        name: 'title',
        type: FieldType.string,
        label: '标题',
      },
    ],
  });

// 详情
export const noticeDetailDataSet = (): DataSet =>
  new DataSet({
    autoCreate: true,
    autoQuery: false,
    paging: false,
    children: { attachList: noticeFileDataSet() },
    fields: [
      {
        name: 'status',
        type: FieldType.string,
        label: '状态',
        defaultValue: '好状态',
      },
      {
        name: 'code',
        type: FieldType.string,
        label: '编码',
        defaultValue: '123',
      },
    ],
    transport: {
      read: config => {
        console.log(config);
        const url = `/notices`;
        const axiosConfig = {
          ...config,
          url,
          method: 'GET' as const,
        };
        return axiosConfig;
      },
      submit: config => {
        console.log(config);
        const url = `/notices`;
        const axiosConfig = {
          ...config,
          url,
          method: 'GET' as const,
        };
        return axiosConfig;
      },
    },
  });

export const treeOptionsDs = () =>
  new DataSet({
    selection: DataSetSelection.multiple,
    // treeCheckStrictly: true,
    data: [
      {
        name: '总部门',
        code: '00000000',
        id: '00000000',
        children: ['00000001', '00000002'],
      },
      {
        name: '一级部门',
        code: '00000001',
        id: '00000001',
        parentId: '00000000',
      },
      {
        name: '龙光控股',
        code: '00000002',
        id: '00000002',
        parentId: '00000000',
      },
    ],
    fields: [
      { name: 'code', type: FieldType.string },
      { name: 'name', type: FieldType.string },
      { name: 'id', type: FieldType.string },
      { name: 'parentId', type: FieldType.string },
    ],
  });
// 部门权限列表
export const permissionDataSet = (): DataSet =>
  new DataSet({
    selection: DataSetSelection.multiple,
    treeCheckStrictly: true,
    fields: [
      {
        name: 'treeValue',
        type: FieldType.object,
        textField: 'name',
        valueField: 'code',
        options: treeOptionsDs(),
      },
      {
        name: 'code',
        bind: 'treeValue.code',
      },
      {
        name: 'name',
        bind: 'treeValue.name',
      },
    ],
  });
