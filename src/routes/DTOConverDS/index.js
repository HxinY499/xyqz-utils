import React from "react";
import { connect } from "dva";
import { Input, Button } from "antd";
import styles from "./style.css";
import { compact } from "../../utils/lodashFun";
import { includes } from "../../utils/utils";

const { TextArea } = Input;

function DTOConverDS() {
  const leftRef = React.useRef();
  const rightRef = React.useRef();
  const [fileds, setFields] = React.useState("");

  React.useEffect(() => {
    console.log("useEffect");
  }, []);

  function handleConver() {
    const fields = [];
    const dto = leftRef.current?.resizableTextArea?.textArea?.value;
    const group = compact(dto.split("@"));
    group.forEach((dtoField) => {
      const dsField = {};
      compact(dtoField.split(`\n`)).forEach((item) => {
        if (item.includes("private")) {
          const arr = compact(item.split(" "));
          dsField.name = arr[2].includes(";")
            ? arr[2].slice(0, arr[2].length - 1)
            : arr[2];
          if (includes(arr[1], ["List"])) {
            dsField.type = "object";
          } else if (includes(arr[1], ["String"])) {
            dsField.type = "string";
          }
        } else if (item.includes("ApiModelProperty")) {
          compact(
            item.slice(item.indexOf("(") + 1, item.indexOf(")")).split(",")
          ).forEach((o) => {
            if (includes(o, ["value =", "value="])) {
              let label = o.split("=")?.[1].trim();
              dsField.label = label.slice(1, label.length - 1);
            } else if (!dsField.label) {
              let label = o.trim();
              dsField.label = label.slice(1, label.length - 1);
            }
          });
        }
      });
      fields.push(dsField);
    });
    setFields(JSON.stringify(fields));
  }

  return (
    <div className={styles.wrapper}>
      <Button
        type="primary"
        style={{ marginBottom: "15px" }}
        onClick={handleConver}
      >
        转换
      </Button>
      <div className={styles["code-wrapper"]}>
        <div className={styles["left-code"]}>
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
        <div className={styles["right-code"]}>
          <TextArea ref={rightRef} rows={25} value={fileds} />
        </div>
      </div>
    </div>
  );
}

export default connect(({ global }) => ({
  global,
}))(DTOConverDS);
