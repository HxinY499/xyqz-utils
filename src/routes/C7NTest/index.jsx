import React, { useMemo } from 'react';
import ReactDOM from 'react-dom';
import { DataSet, Lov } from 'choerodon-ui/pro';

function handleDataSetChange({ record, name, value, oldValue }) {
  console.log(
    '[dataset]',
    value,
    '[oldValue]',
    oldValue,
    `[record.get('${name}')]`,
    record.get(name)
  );
}

function App() {
  const ref = React.useRef();
  const ds = useMemo(
    () =>
      new DataSet({
        autoCreate: true,
        fields: [
          {
            name: 'code',
            type: 'object',
            lovCode: 'LOV_CODE',
            lovPara: { code: '111' },
            required: true,
          },
          {
            name: 'code_string',
            type: 'object',
            lovCode: 'LOV_CODE',
            required: true,
          },
          { name: 'code_code', type: 'string', bind: 'code.code' },
          {
            name: 'code_description',
            type: 'string',
            bind: 'code.description',
          },
        ],
        events: {
          update: handleDataSetChange,
        },
      }),
    []
  );

  React.useEffect(() => {
    console.log(ref);
  }, []);
  return (
    <Lov
      ref={ref}
      dataSet={ds}
      name="code_string"
      mode="button"
      placeholder="请选择"
    />
  );
}

ReactDOM.render(<App />, document.getElementById('container'));
