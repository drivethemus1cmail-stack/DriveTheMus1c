import type { ReactNode } from "react";
import { useReveal, revealDelay } from "../useReveal";

type Props = {
  children: ReactNode;
  /** Position among siblings, used to stagger the group. */
  index?: number;
  className?: string;
};

/** Wraps a card so it fades and lifts into place the first time it's scrolled to. */
export default function Reveal({ children, index = 0, className = "" }: Props) {
  const { ref, className: revealClass } = useReveal();

  return (
    <div ref={ref} className={`${revealClass} ${className}`} style={revealDelay(index)}>
      {children}
    </div>
  );
}
