import React from 'react';
import styles from './index.less';

export default function Animation() {
  return (
    <div className={styles.animationWrapper}>
      <div className={styles.threeDContainer}>
        <div className={`${styles.item} ${styles['item_one']}`} />
        <div className={`${styles.item} ${styles['item_two']}`} />
        <div className={`${styles.item} ${styles['item_three']}`} />
        <div className={`${styles.item} ${styles['item_four']}`} />
        <div className={`${styles.item} ${styles['item_five']}`} />
        <div className={`${styles.item} ${styles['item_six']}`} />
        <div className={`${styles.item} ${styles['item_seven']}`} />
        <div className={`${styles.item} ${styles['item_eight']}`} />
        <div className={`${styles.item} ${styles['item_nine']}`} />
        <div className={`${styles.item} ${styles['item_ten']}`} />
      </div>
    </div>
  );
}
