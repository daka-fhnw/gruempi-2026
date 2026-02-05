import { useEffect } from "react";

const useScrollToTop = (smooth: boolean = false): void => {
  const behavior = smooth ? "smooth" : "instant";
  useEffect(
    () =>
      window.scrollTo({
        top: 0,
        left: 0,
        behavior,
      }),
    [behavior],
  );
};

export default useScrollToTop;
