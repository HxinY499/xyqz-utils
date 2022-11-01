import React, { useContext } from 'react';
import styles from './index.less';
import Store, { StoreProvider } from './store';
import GridCell from './GridCell';
import GridSelection from './GridSelection';

function GridSandBox(props) {
  const { gridCells, selection } = useContext(Store);

  return (
    <>
      <div className={styles['grid-wrapper']}>
        {gridCells.map(cell => (
          <GridCell section={cell} key={cell._id} />
        ))}
        {selection.begin && <GridSelection />}
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
