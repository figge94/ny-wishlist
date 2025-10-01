import type { ReactNode } from "react";
import { S } from "./styles";

export type SectionCardProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean; // sätt false om du vill styra padding själv
};

export function SectionCard({
  children,
  className = "",
  padded = true
}: SectionCardProps) {
  return (
    <div className={`${S.card} ${padded ? S.cardP : ""} ${className}`}>
      {children}
    </div>
  );
}
