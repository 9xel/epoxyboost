import type { ReactNode } from "react";

type PillLimeButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function PillLimeButton({ href, children, className }: PillLimeButtonProps) {
  return (
    <a
      href={href}
      className={["btn--big solid--lime btn--pill shrink-0 inline-flex", className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </a>
  );
}
