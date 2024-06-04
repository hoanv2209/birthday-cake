import { useEffect, useState } from "react";
import styles from "./index.module.scss";

export const Name = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const nameParam = urlParams.get("name");
    if (nameParam !== null) {
      setName(nameParam);
    }
  }, [setName]);

  return (
    <div id="name" className={styles["name"]}>
      {name}
    </div>
  );
};
