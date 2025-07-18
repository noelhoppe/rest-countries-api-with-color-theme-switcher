export default function hslStringToHex(hsl: string): string {
  const match = hsl.match(/^hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)$/);
  if (!match) return "#000000";

  const h = Number(match[1]);
  const s = Number(match[2]);
  const l = Number(match[3]);

  const lNorm = l / 100;
  const a = s * Math.min(lNorm, 1 - lNorm) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}