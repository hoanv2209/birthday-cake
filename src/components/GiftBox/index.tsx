import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

type GiftBoxProps = {
  onClick: MouseEventHandler;
};

const GiftBox = ({ onClick }: GiftBoxProps) => {
  return (
    <div className={styles["overlay"]}>
      <div onClick={onClick} className={styles["gift-box"]}></div>
    </div>
  );
};

export default GiftBox;
