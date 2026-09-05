/**
 * Re-mounts on every navigation, giving each page a single 180ms opacity
 * entrance — the whole of the site's motion budget. Nothing animates on
 * scroll, and prefers-reduced-motion zeroes this too (globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
