/**
 * Renders the V2 mockup's ".count" stat markup as static "0" — the actual
 * 0 -> target animation is driven by SiteMotion.tsx's scroll-triggered
 * checkCount()/runCount(), a direct port of the design's site.js, which
 * scans the DOM for "[data-count]" elements the same way the original
 * vanilla-JS mockup does.
 */
export function CountUp({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  return (
    <span className="stat-num count" data-count={target} data-suffix={suffix}>
      0
    </span>
  );
}
