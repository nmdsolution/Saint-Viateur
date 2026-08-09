import { Children, cloneElement, type CSSProperties, type ReactElement } from "react";

/**
 * Adds the V2 design's ".reveal" fade-up-on-load animation (and its "--i"
 * stagger delay) to its single child, without introducing an extra wrapper
 * element that would break grid/flex layouts built around direct children.
 */
export function Reveal({
  index = 0,
  children,
}: {
  index?: number;
  children: ReactElement<{ className?: string; style?: CSSProperties }>;
}) {
  const child = Children.only(children);
  const className = [child.props.className, "reveal"].filter(Boolean).join(" ");
  const style = {
    ...child.props.style,
    "--i": index,
  } as CSSProperties;

  return cloneElement(child, { className, style });
}
