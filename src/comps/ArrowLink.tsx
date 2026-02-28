import type { PropsWithChildren } from "react";
import { ArrowIcon } from "../icons/ArrowIcon";

export function ArrowLink({ children }: PropsWithChildren) {
  return (
    <>
      <span className="me-1">
        <ArrowIcon />
      </span>
      {children}
    </>
  );
}
