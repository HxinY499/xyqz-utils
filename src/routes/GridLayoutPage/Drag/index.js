import React, { useState } from "react";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import RGL from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./index.less";

export default function GridLayoutPage() {
  const [setting, setSetting] = useState(false);
  const [layout, setLayout] = useState([
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 3, h: 2 },
    { i: "c", x: 4, y: 0, w: 1, h: 2 },
  ]);

  const onLayoutChange = layout => {
    setLayout(layout);
  };

  const startSettingLayout = () => {
    setSetting(true);
  };

  const cancelSettingLayout = () => {
    setSetting(false);
  };

  const saveSettingLayout = () => {};

  const renderCard = () => {
    return layout.map(item => {
      // TODO: GridItem need width
      if (setting === true) {
        return (
          <div key={item.i} className={styles["grid-item"]}>
            {/* {item.component} */}
            {item.i}
            <div className={styles.dragCard} />
            <CloseOutlined
              type="close"
              className={styles.closeBtn}
              onClick={() => {
                // this.handleRemoveCard(item.name);
              }}
            />
          </div>
        );
      }
      return (
        <div key={item.i} className={styles.boxShadow}>
          {/* {item.component} */}
          {item.i}
        </div>
      );
    });
  };

  return (
    <div className={styles["page-content"]}>
      <div className={styles["page-header"]}>
        {!setting && (
          <Button type="primary" onClick={startSettingLayout}>
            设置布局
          </Button>
        )}
        {setting && (
          <>
            <Button
              onClick={cancelSettingLayout}
              style={{ marginRight: "10px" }}
            >
              取消
            </Button>
            <Button type="primary" onClick={saveSettingLayout}>
              保存
            </Button>
          </>
        )}
      </div>
      <div className={styles["card-content"]}>
        <div className={styles["card-content-container"]}>
          <RGL
            className={styles["gridLayoutContainer"]}
            style={{ position: "relative" }}
            layout={layout}
            cols={12}
            rowHeight={30}
            width={1200}
            isDraggable={setting}
            isResizable={setting}
            // useCSSTransforms={true}
            onLayoutChange={onLayoutChange}
          >
            {/* <div className={styles["grid-item"]} key="a">
          a
        </div>
        <div className={styles["grid-item"]} key="b">
          b
        </div>
        <div className={styles["grid-item"]} key="c">
          c
        </div> */}
            {renderCard()}
          </RGL>
        </div>
      </div>
    </div>
  );
}
