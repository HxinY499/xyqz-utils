import React, { useContext } from 'react';
import { Select, Icon } from 'choerodon-ui/pro';
import Store from './store';
import styles from './index.less';
import { gridAreaFromSection } from './utils';

function AreaField(props) {
  const { allFields, setState, doneFields } = useContext(Store);
  const { areaField, index } = props;

  const handleDeleteClick = () => {
    const newFields = [...doneFields];
    // 来自数据库的数据需要加删除标记
    if (areaField.customTempletLineId) {
      newFields[index].status = 'delete';
    } else {
      // 本地的数据，直接删除
      newFields.splice(index, 1);
    }
    setState('doneFields', newFields);
  };

  const handleSelectChange = value => {
    const newFields = [...doneFields];
    newFields[index] = { ...areaField, fieldName: value };
    // 来自数据库的数据需要加更新标记
    if (areaField.customTempletLineId) {
      newFields[index].status = 'update';
    }
    setState('doneFields', newFields);
  };

  const gridArea = gridAreaFromSection(areaField);

  return (
    <section style={{ gridArea }} className={styles['done-field-area']}>
      <Select value={areaField.fieldName} onChange={handleSelectChange}>
        {allFields.map(o => (
          <Select.Option value={o}>{o}</Select.Option>
        ))}
      </Select>
      <Icon type="cancel" onClick={handleDeleteClick} />
    </section>
  );
}

export default AreaField;
