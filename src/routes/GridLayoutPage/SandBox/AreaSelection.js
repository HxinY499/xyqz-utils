import React, { useContext, useEffect, useRef, useState } from 'react';
import { Select, Icon, message } from 'choerodon-ui/pro';
import Store from './store';
import styles from './index.less';
import { gridAreaFromSection } from './utils';

export default function AreaSelection() {
  const { selection, allFields, setState, doneFields } = useContext(Store);
  const selectRef = useRef();
  const [count, setCount] = useState();

  useEffect(() => {
    const colCount = selection.complete.col.end - selection.begin.col.start;
    const rowCount = selection.complete.row.end - selection.begin.row.start;
    setCount(colCount * rowCount);
  }, [selection]);

  const handleDoneClick = () => {
    if (!selectRef.current?.value) {
      message.warning('请选择字段', 2, null, 'top');
      return;
    }
    setState(['doneFields', 'selection'], {
      doneFields: [
        ...doneFields,
        {
          begin: selection.begin,
          complete: selection.complete,
          fieldName: selectRef.current.value,
          status: 'add',
        },
      ],
      selection: {},
    });
  };
  const gridArea = gridAreaFromSection(selection);

  return (
    <section style={{ gridArea }} className={styles['selection-grid-area']}>
      <Select ref={selectRef}>
        {allFields.map(o => (
          <Select.Option value={o}>{o}</Select.Option>
        ))}
      </Select>
      <Icon type="check_circle" onClick={handleDoneClick} />
      <span className={styles.count}>{count}</span>
    </section>
  );
}
