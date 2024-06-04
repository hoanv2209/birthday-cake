import { useEffect, useState } from "react";

export const Cake = ({ candleVisible }: { candleVisible: boolean }) => {
  const [candleP1, setCandleP1] = useState("");
  const [candleP2, setCandleP2] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const p1 = urlParams.get("candleP1");
    if (p1 !== null) {
      setCandleP1(p1);
    }

    const p2 = urlParams.get("candleP2");
    if (p2 !== null) {
      setCandleP2(p2);
    }
  }, [candleP1, candleP2]);

  const candleP1Class = `candle candle-p1 candle-${candleP1}`;
  const candleP2Class = `candle candle-p2 candle-${candleP2}`;
  return (
    <div className="cake">
      <div className="plate"></div>
      <div className="layer layer-bottom"></div>
      <div className="layer layer-middle"></div>
      <div className="layer layer-top"></div>
      <div className="icing"></div>
      <div className="drip drip1"></div>
      <div className="drip drip2"></div>
      <div className="drip drip3"></div>
      <div className={candleP1Class}>
        {candleVisible ? <div className="flame"></div> : null}
      </div>
      <div className={candleP2Class}>
        {candleVisible ? <div className="flame"></div> : null}
      </div>
    </div>
  );
};
