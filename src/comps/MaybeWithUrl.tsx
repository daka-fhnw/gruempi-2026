import type { PropsWithChildren } from "react";

interface MaybeWithUrlProps {
  url?: string;
}

export function MaybeWithUrl({
  url,
  children,
}: PropsWithChildren<MaybeWithUrlProps>) {
  if (url) {
    const isMailto = url.startsWith("mailto:");
    return (
      <a href={url} target={isMailto ? undefined : "_blank"}>
        {children}
      </a>
    );
  }
  return children;
}
