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
  const gridCells = generateGridCells({ columns: 12, rows: 5 });
  const [selection, setSelection] = useState({});
  const [doneFields, setDoneFields] = useState([]);
  const selectionRef = useRef(selection);

  useLayoutEffect(() => {
    selectionRef.current = selection;
  }, [selection]);

  const setStateBasis = useCallback((type, newState) => {
    switch (type) {
      case 'selection':
        setSelection(newState);
        break;
      case 'doneFields':
        setDoneFields(newState);
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
      }}
    >
      {children}
    </Store.Provider>
  );
}
