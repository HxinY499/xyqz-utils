import React, { useContext } from 'react';
import { Form, InputNumber } from 'antd';
import styles from './index.less';
import Store, { StoreProvider } from './store';
import GridCell from './GridCell';
import AreaSelection from './AreaSelection';
import AreaField from './AreaField';

function GridSandBox(props) {
  const {
    gridCells,
    selection,
    doneFields,
    gridContainerStyle,
    gridConfig,
    setState,
  } = useContext(Store);

  function handleConfigChange(_, allValues) {
    setState('gridConfig', allValues);
  }

  return (
    <>
      <div className={styles['config-wrapper']}>
        <Form initialValues={gridConfig} onValuesChange={handleConfigChange}>
          <Form.Item label="列数" name="columns">
            <InputNumber />
          </Form.Item>
          <Form.Item label="行数" name="rows">
            <InputNumber />
          </Form.Item>
        </Form>
      </div>
      <div className={styles['grid-wrapper']} style={{ gridContainerStyle }}>
        {gridCells.map(cell => (
          <GridCell section={cell} key={cell._id} />
        ))}
        {selection.begin && <AreaSelection />}
        {doneFields.map(
          (field, index) =>
            field.status !== 'delete' && (
              <AreaField areaField={field} index={index} />
            )
        )}
      </div>
    </>
  );
}

export default function GridSandBoxWithContext(props) {
  return (
    <StoreProvider>
      <GridSandBox {...props} />
    </StoreProvider>
  );
}
