export default function stringToSoft(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const abs = Math.abs(hash);

    const hue = abs % 360;
    const saturation = 65 + (abs % 15); // 65–80%
    const lightness = 55 + (abs % 10);  // 55–65%

    return hslToHex(hue, saturation, lightness);
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const r = Math.round(255 * f(0));
    const g = Math.round(255 * f(8));
    const b = Math.round(255 * f(4));

    return `#${[r, g, b].map(x => x.toString(16).padStart(2, "0")).join("")}`;
}

