import { useEffect } from "react";

// see: https://reactlevelup.com/posts/use-lock-body-scroll
const useLockBodyScroll = (): void => {
  useEffect(() => {
    const originalStyle: string = window.getComputedStyle(
      document.body,
    ).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle || "";
    };
  }, []);
};

export default useLockBodyScroll;
