import React, { useContext } from 'react';
import styles from './index.less';
import Store, { StoreProvider } from './store';
import GridCell from './GridCell';
import AreaSelection from './AreaSelection';
import AreaField from './AreaField';

function GridSandBox(props) {
  const { gridCells, selection, doneFields } = useContext(Store);

  return (
    <>
      <div className={styles['grid-wrapper']}>
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
