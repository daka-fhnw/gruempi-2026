import { useEffect } from "react";

// see: https://reactlevelup.com/posts/use-lock-body-scroll
export const useLockBodyScroll = (): void => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle || "";
    };
  }, []);
};
