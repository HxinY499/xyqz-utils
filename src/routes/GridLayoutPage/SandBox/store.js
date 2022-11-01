import React, { createContext, useLayoutEffect, useRef, useState } from 'react';

const Store = createContext();
export default Store;

function generateGridCells({ columns, rows }) {
  const sections = [];
  for (let i = 1; i <= columns; i++) {
    const col = { start: i, end: i + 1 };
    for (let j = 1; j <= rows; j++) {
      const section = { col, row: { start: j, end: j + 1 } };
      sections.push({ ...section, _id: JSON.stringify(section) });
    }
  }
  return sections;
}

export function StoreProvider(props) {
  const { children } = props;
  const gridCells = generateGridCells({ columns: 10, rows: 5 });
  const [selection, setSelection] = useState({});
  const selectionRef = useRef(selection);

  useLayoutEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  function setState(type, newState) {
    switch (type) {
      case 'selection':
        setSelection(newState);
        break;
      default:
        break;
    }
  }

  function computeSelection(newSection) {
    const { baseSection } = selectionRef.current;
    const beginSection_colStart = Math.min(
      newSection.col.start,
      baseSection.col.start
    );
    const beginSection_rowStart = Math.min(
      newSection.row.start,
      baseSection.row.start
    );
    const completeSection_colStart = Math.max(
      newSection.col.end,
      baseSection.col.end
    );
    const completeSection_rowStart = Math.max(
      newSection.row.end,
      baseSection.row.end
    );
    return {
      baseSection,
      begin: {
        col: {
          start: beginSection_colStart,
          end: beginSection_colStart + 1,
        },
        row: {
          start: beginSection_rowStart,
          end: beginSection_rowStart + 1,
        },
      },
      complete: {
        col: {
          start: completeSection_colStart - 1,
          end: completeSection_colStart,
        },
        row: {
          start: completeSection_rowStart - 1,
          end: completeSection_rowStart,
        },
      },
    };
  }

  return (
    <Store.Provider
      value={{ gridCells, setState, selection, computeSelection }}
    >
      {children}
    </Store.Provider>
  );
}
