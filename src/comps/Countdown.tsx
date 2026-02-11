import { useEffect, useState } from "react";

const eventMillis = new Date("2026-04-30T17:00:00").getTime();
const millisInHour = 1000 * 60 * 60;
const millisInDay = millisInHour * 24;
const refreshInterval = 1000 * 60 * 5;

export function Countdown() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    const calculate = () => {
      const millis = eventMillis - Date.now();
      const days = Math.floor(millis / millisInDay);
      const hours = Math.floor((millis % millisInDay) / millisInHour);
      if (days > 0 || hours > 0) {
        setMessage(
          `Nur noch ${days} ${days === 1 ? "Tag" : "Tage"}` +
            ` und ${hours} ${hours === 1 ? "Stunde" : "Stunden"}`,
        );
      } else {
        setMessage("Los geht's!");
      }
    };
    calculate();
    const interval = setInterval(calculate, refreshInterval);
    return () => clearInterval(interval);
  }, []);
  return message;
}
