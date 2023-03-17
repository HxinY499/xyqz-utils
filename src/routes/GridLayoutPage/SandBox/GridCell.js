import React, { useContext } from 'react';
import styles from './index.less';
import Store from './store';

function sectionFromEvent(event) {
  const el = document.elementFromPoint(event.clientX, event.clientY);
  const { colStart, rowStart, colEnd, rowEnd } = el.dataset || {};
  if (el && colStart) {
    return {
      col: {
        start: colStart,
        end: colEnd,
      },
      row: {
        start: rowStart,
        end: rowEnd,
      },
    };
  }
  return null;
}

function preventDefault(e) {
  e.stopPropagation();
  e.preventDefault();
}
function removeEventListener(onPointerMove, onPointerUp) {
  window.removeEventListener('pointermove', onPointerMove);
  window.removeEventListener('pointerup', onPointerUp);
}
function addEventListener(onPointerMove, onPointerUp) {
  window.addEventListener('pointermove', onPointerMove, false);
  window.addEventListener('pointerup', onPointerUp, false);
}

export default function GridCell(props) {
  const { section = {} } = props;
  const { selection, setState, computeSelection } = useContext(Store);

  function setSelectionFromEvent(e) {
    const movedSection = sectionFromEvent(e);
    if (movedSection) {
      setState('selection', computeSelection(movedSection));
    }
  }

  function cellDown() {
    if (selection.begin) {
      let shouldGetNewBaseSection = true;
      const onPointerMove = e => {
        preventDefault(e);
        if (shouldGetNewBaseSection) {
          setState('selection', {
            begin: section,
            complete: section,
            baseSection: section,
          });
          shouldGetNewBaseSection = false;
        } else {
          setSelectionFromEvent(e);
        }
      };
      const onPointerUp = e => {
        preventDefault(e);
        removeEventListener(onPointerMove, onPointerUp);
        setSelectionFromEvent(e);
      };
      addEventListener(onPointerMove, onPointerUp);
    } else {
      setState('selection', {
        begin: section,
        complete: section,
        baseSection: section,
      });
      const onPointerMove = e => {
        preventDefault(e);
        setSelectionFromEvent(e);
      };
      const onPointerUp = e => {
        preventDefault(e);
        removeEventListener(onPointerMove, onPointerUp);
      };
      addEventListener(onPointerMove, onPointerUp);
    }
  }

  const gridArea = `${section.row.start}/${section.col.start}/${section.row.end}/${section.col.end}`;
  return (
    <section
      style={{ gridArea }}
      className={styles['grid-cell']}
      // onPointerDown={cellDown}
      // data-col-start={section.col.start}
      // data-row-start={section.row.start}
      // data-col-end={section.col.end}
      // data-row-end={section.row.end}
    >
      <div className={styles['cell-left-top']}></div>
      <div
        className={styles['grid-cell-main']}
        onPointerDown={cellDown}
        data-col-start={section.col.start}
        data-row-start={section.row.start}
        data-col-end={section.col.end}
        data-row-end={section.row.end}
      ></div>
    </section>
  );
}
