import React, {
  createContext,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { generateGridCells, computeSelectionBasis } from './utils';

const Store = createContext();
export default Store;

const allFields = [
  'R(mm)',
  'Row No.',
  'Spec.No.',
  'Alloy',
  'Order No.',
  'Lot No.',
  'Drawing No.',
  'Heat No.',
  'Tube Size',
];

export function StoreProvider(props) {
  const { children } = props;
  const [gridConfig, setGridConfig] = useState({ columns: 12, rows: 5 });
  const gridCells = generateGridCells({
    columns: gridConfig.columns,
    rows: gridConfig.rows,
  });
  const [gridContainerStyle, setGridContainerStyle] = useState({});
  const [selection, setSelection] = useState({
    'grid-template-rows': `repeat(${gridConfig.rows}, 1fr)`,
    'grid-template-columns': `repeat(${gridConfig.columns}, 1fr)`,
  });
  const [doneFields, setDoneFields] = useState([]);
  const selectionRef = useRef();
  selectionRef.current = selection;

  const setStateBasis = useCallback((type, newState) => {
    switch (type) {
      case 'selection':
        setSelection(newState);
        break;
      case 'doneFields':
        setDoneFields(newState);
        break;
      case 'gridConfig':
        setGridConfig(newState);
        setGridContainerStyle({
          'grid-template-rows': `repeat(${newState.rows}, 1fr)`,
          'grid-template-columns': `repeat(${newState.columns}, 1fr)`,
        });
        break;
      default:
        break;
    }
  }, []);

  const setState = useCallback(
    (type, newState) => {
      if (typeof type === 'string') {
        setStateBasis(type, newState);
      } else if (Array.isArray(type)) {
        ReactDOM.unstable_batchedUpdates(() => {
          for (let i = 0; i < type.length; i++) {
            setStateBasis(type[i], newState[type[i]]);
          }
        });
      }
    },
    [setStateBasis]
  );

  function computeSelection(newSection) {
    const { baseSection } = selectionRef.current;
    return computeSelectionBasis(baseSection, newSection);
  }

  return (
    <Store.Provider
      value={{
        gridCells,
        setState,
        selection,
        computeSelection,
        allFields,
        doneFields,
        gridContainerStyle,
        gridConfig,
      }}
    >
      {children}
    </Store.Provider>
  );
}
