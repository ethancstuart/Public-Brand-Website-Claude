export function isAllCaps(s: string): boolean {
  return s === s.toUpperCase() && /[A-Z]/.test(s);
}
