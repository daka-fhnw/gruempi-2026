import { useEffect } from "react";

const useEscapeKey = (onEscape: () => void): void => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) =>
      event.key === "Escape" && onEscape();
    document.addEventListener("keydown", handleEscape, false);
    return () => document.removeEventListener("keydown", handleEscape, false);
  }, []);
};

export default useEscapeKey;
