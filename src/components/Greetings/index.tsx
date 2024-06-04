import styles from "./index.module.scss";
import greetings from "../../greetings.json";
import { useState } from "react";

const Greetings = () => {
  const [showGreetings, setShowGreetings] = useState(
    greetings.items.length > 0
  );
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    if (index < greetings.items.length - 1) {
      setIndex(index + 1);
    } else {
      setShowGreetings(false);
    }
  };

  return (
    showGreetings && (
      <div className={styles["overlay"]}>
        <div className={styles["box"]}>
          <div className={styles["content"]}>
            <h3 className={styles["greetings-text"]}>{greetings.items[index].text}</h3>
            <img
              src={greetings.items[index].image}
              className={styles["auto-fit-image"]}
            />
          </div>
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    )
  );
};

export default Greetings;
