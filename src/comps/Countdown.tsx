import { useEffect, useState } from "react";

const EVENT_MILLIS = new Date("2026-04-30T17:00:00").getTime();
const MILLIS_IN_HOUR = 1000 * 60 * 60;
const MILLIS_IN_DAY = MILLIS_IN_HOUR * 24;
const INTERVAL = 1000 * 60 * 5;

export default function Countdown() {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  useEffect(() => {
    const calculate = () => {
      const millis = EVENT_MILLIS - Date.now();
      setDays(Math.floor(millis / MILLIS_IN_DAY));
      setHours(Math.floor((millis % MILLIS_IN_DAY) / MILLIS_IN_HOUR));
    };
    calculate();
    const interval = setInterval(calculate, INTERVAL);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      Nur noch {days} Tage und {hours} Stunden!
    </>
  );
}
