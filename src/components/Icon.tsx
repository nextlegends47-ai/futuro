import type { ReactNode } from "react";

/**
 * Eine einzige Familie von Linien-Symbolen: gleiche Strichstärke, runde Enden.
 * Alle Symbole sind eigene, schlichte Zeichnungen auf einem 24er-Raster.
 */
const paths = {
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4.5h2.3l2.2 10a1.6 1.6 0 0 0 1.6 1.2h7.9a1.6 1.6 0 0 0 1.5-1.2L20.4 8H6.1" />
      <circle cx="9.6" cy="19.4" r="1.1" />
      <circle cx="16.9" cy="19.4" r="1.1" />
    </>
  ),
  menu: <path d="M4 8h16M4 16h16" />,
  heart: <path d="M12 19.5S5 15.2 5 9.9a3.9 3.9 0 0 1 7-2.4 3.9 3.9 0 0 1 7 2.4c0 5.3-7 9.6-7 9.6Z" />,
  user: (
    <>
      <circle cx="12" cy="8.2" r="3.5" />
      <path d="M5 19.8c.9-3.4 3.7-5.3 7-5.3s6.1 1.9 7 5.3" />
    </>
  ),
  chat: <path d="M5 6.7A2.7 2.7 0 0 1 7.7 4h8.6A2.7 2.7 0 0 1 19 6.7v5.6a2.7 2.7 0 0 1-2.7 2.7h-5L7 18.6V15a2.7 2.7 0 0 1-2-2.7Z" />,
  shield: (
    <>
      <path d="m12 3.5 7 2.5v5.4c0 4.2-2.9 7.6-7 9.1-4.1-1.5-7-4.9-7-9.1V6Z" />
      <path d="m9 12 2.2 2.2 3.9-4.1" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.6" />
      <path d="m4.6 7.6 7.4 5.4 7.4-5.4" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10.5" width="14" height="10" rx="2.6" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.7 2.9 2.7 14.1 0 17M12 3.5c-2.7 2.9-2.7 14.1 0 17" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  code: <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.6 6l-3.2 12" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="11" height="11" rx="2.6" />
      <path d="M15.5 8.5v-2a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.6" />
      <path d="M11 17.5h2" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="9.5" width="16" height="10.5" rx="2.2" />
      <path d="M12 9.5V20M3.5 9.5h17M12 9.5c-2.800 0-5-.8-5-2.700C7 5.200 8.300 4.500 9.400 5c1.500.7 2.600 4.500 2.600 4.500Zm0 0c2.800 0 5-.8 5-2.700 0-1.600-1.300-2.300-2.400-1.800-1.500.7-2.600 4.500-2.600 4.500Z" />
    </>
  ),
  trash: <path d="M5 7h14M10 7V5h4v2M7 7l.8 11a2 2 0 0 0 2 1.900h4.400a2 2 0 0 0 2-1.900L17 7" />,
  gamepad: (
    <>
      <path d="M7.200 8h9.600a4 4 0 0 1 4 4.600l-.5 3a2.200 2.200 0 0 1-3.900 1L15 15H9l-1.400 1.600a2.200 2.200 0 0 1-3.900-1l-.5-3A4 4 0 0 1 7.200 8Z" />
      <path d="M8.500 10.800v2.800M7.100 12.200h2.800M15.500 11.300h.01M17.300 13.100h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  external: <path d="M14 5h5v5M19 5l-8 8M17 14v3.500a1.500 1.500 0 0 1-1.500 1.500h-9A1.500 1.500 0 0 1 5 17.500v-9A1.500 1.500 0 0 1 6.500 7H10" />,
  receipt: <path d="M7 3.500h10v17L14.500 19 12 20.500 9.500 19 7 20.500ZM10 8.500h4M10 12h4" />,
  card: (
    <>
      <rect x="3" y="5.500" width="18" height="13" rx="2.600" />
      <path d="M3 10h18M7 14.500h3" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.500" height="6.500" rx="1.800" />
      <rect x="13.500" y="4" width="6.500" height="6.500" rx="1.800" />
      <rect x="4" y="13.500" width="6.500" height="6.500" rx="1.800" />
      <rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1.800" />
    </>
  ),
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 22, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
