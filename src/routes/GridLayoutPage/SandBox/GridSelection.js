import React, { useContext } from 'react';
import Store from './store';
import styles from './index.less';

export default function GridSelection() {
  const { selection } = useContext(Store);
  const gridArea = `${selection.begin?.row.start}/${selection.begin?.col.start}/${selection.complete?.row.end}/${selection.complete?.col.end}`;

  return (
    <section
      style={{ gridArea }}
      className={styles['selection-grid-cell']}
    ></section>
  );
}
