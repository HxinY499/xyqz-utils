import React from 'react';
import { Input, Button } from 'antd';
import styles from './style.css';
import { compact } from '../../utils/lodashFun';
import { includes } from '../../utils/utils';

const { TextArea } = Input;

function DTOConverDS(props) {
  const leftRef = React.useRef();
  const rightRef = React.useRef();
  const [fields, setFields] = React.useState('');
  const [columns, setColumns] = React.useState('');
  const [count, setCount] = React.useState(0);

  function handleConver() {
    const result = [];
    const dto = leftRef.current?.resizableTextArea?.textArea?.value;
    let singleField = [];
    const group = [];
    compact(dto.split('\n'))?.forEach(item => {
      includes(item, ['@ApiModelProperty', 'private']) &&
        singleField.push(item);
      if (item.includes('private')) {
        group.push(singleField);
        singleField = [];
      }
    });
    group.forEach(dtoField => {
      const dsField = {};
      // 个人习惯将name和type写在label前面，所以反转数组
      dtoField.reverse();
      dtoField.forEach(item => {
        if (item.includes('@ApiModelProperty')) {
          // 设置label
          compact(
            item.slice(item.indexOf('(') + 1, item.indexOf(')')).split(',')
          ).forEach(o => {
            if (includes(o, ['value =', 'value='])) {
              let label = o.split('=')?.[1].trim();
              dsField.label = label.slice(1, label.length - 1);
            } else if (!dsField.label) {
              let label = o.trim();
              dsField.label = label.slice(1, label.length - 1);
            }
          });
        } else if (item.includes('private')) {
          // 设置name和type
          const arr = compact(item.split(' '));
          dsField.name = arr[2].includes(';')
            ? arr[2].slice(0, arr[2].length - 1)
            : arr[2];
          if (includes(arr[1], ['List'])) {
            dsField.type = 'object';
          } else if (includes(arr[1], ['BigDecimal'])) {
            dsField.type = 'number';
          } else if (includes(arr[1], ['Date'])) {
            dsField.type = 'date';
          } else {
            dsField.type = 'string';
          }
        }
      });
      result.push(dsField);
    });
    setCount(result.length);
    generateColumns(result);
    setFields(JSON.stringify(result));
  }

  function generateColumns(fields) {
    const columns = fields.map(o => {
      return { name: `${o.name}`, header: `${o.label}` };
    });
    setColumns(JSON.stringify(columns));
  }

  return (
    <div className={styles.wrapper}>
      <Button
        type="primary"
        style={{ marginBottom: '15px' }}
        onClick={handleConver}
      >
        转换
      </Button>
      <span className={styles.tip}>{count > 0 && `共${count}个field`}</span>
      <div className={styles['code-wrapper']}>
        <div className={styles['left-code']}>
          <TextArea
            rows={25}
            ref={leftRef}
            onPressEnter={handleConver}
            placeholder={`
  输入后端DTO
  示例：
  @ApiModelProperty("站点ID")
  private Long siteId;
  @ApiModelProperty("站点CODE")
  private String siteCode;`}
          />
        </div>
        <div className={styles['right-code']}>
          <TextArea ref={rightRef} rows={25} value={fields} />
        </div>
        <div className={styles['right-code']}>
          <TextArea rows={25} value={columns} />
        </div>
      </div>
    </div>
  );
}

export default DTOConverDS;
