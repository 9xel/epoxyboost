import type { ReactNode } from "react";

type PillDarkOutlineButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function PillDarkOutlineButton({ href, children, className }: PillDarkOutlineButtonProps) {
  return (
    <a
      href={href}
      className={["btn--big outline--lime-on-dark btn--pill shrink-0 inline-flex", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}
