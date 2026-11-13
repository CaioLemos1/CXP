import type { IconName } from "@/content/solutions";

type IconProps = {
  name:
    | IconName
    | "whatsapp"
    | "arrow-up-right"
    | "arrow-right"
    | "instagram"
    | "mail"
    | "pin"
    | "menu"
    | "close"
    | "chevron-left"
    | "chevron-right";
  className?: string;
};

/** Ícones vetoriais minimalistas, traço de 1.25px, herdando a cor do texto. */
export function Icon({ name, className = "size-6" }: IconProps) {
  const filled = name === "whatsapp";
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <IconPaths name={name} />
    </svg>
  );
}

function IconPaths({ name }: { name: IconProps["name"] }) {
  switch (name) {
    case "key":
      return (
        <>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9v11h14V9" />
          <circle cx="12" cy="13" r="2" />
          <path d="M12 15v3" />
        </>
      );
    case "whatsapp":
      return (
        <path d="M12 2.2a9.75 9.75 0 0 0-8.4 14.7L2.3 21.8l5-1.3A9.75 9.75 0 1 0 12 2.2Zm0 17.8a8.05 8.05 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.07 8.07 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.1 3.6c1.5.7 2.1.7 2.9.6a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3Z" />
      );
    case "book":
      return (
        <>
          <path d="M12 6.5C10 5 7 4.5 3 5v13c4-.5 7 0 9 1.5 2-1.5 5-2 9-1.5V5c-4-.5-7 0-9 1.5Z" />
          <path d="M12 6.5v13" />
        </>
      );
    case "coins":
      return (
        <>
          <ellipse cx="12" cy="6.5" rx="7" ry="2.5" />
          <path d="M5 6.5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
          <path d="M5 10.5v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
          <path d="M5 14.5v3c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-3" />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2" />
        </>
      );
    case "layers":
      return (
        <>
          <path d="m12 3 9 5-9 5-9-5z" />
          <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
        </>
      );
    case "pin":
      return (
        <>
          <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
          <circle cx="12" cy="10" r="2.3" />
        </>
      );
    case "handshake":
      return (
        <>
          <path d="m2 11 4-4 3 1 3-2 4 1 6 4" />
          <path d="m6 7 0 6 5 5c.8.8 2 .8 2.8 0l4.2-4.2" />
          <path d="m11 10 3 3M9 12l3 3M13 9l4 4 3-3" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M4 20h16" />
          <rect x="5" y="14" width="3" height="5" />
          <rect x="10.5" y="11" width="3" height="8" />
          <rect x="16" y="7" width="3" height="12" />
          <path d="m5 10 5-4 3 2 6-5M16 3h3v3" />
        </>
      );
    case "arrow-up-right":
      return <path d="M7 17 17 7M8 7h9v9" />;
    case "arrow-right":
      return <path d="M4 12h16M14 6l6 6-6 6" />;
    case "instagram":
      return (
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
        </>
      );
    case "mail":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3.5 6 8.5 7 8.5-7" />
        </>
      );
    case "menu":
      return <path d="M4 8h16M8 16h12" />;
    case "close":
      return <path d="M6 6l12 12M18 6 6 18" />;
    case "chevron-left":
      return <path d="m15 5-7 7 7 7" />;
    case "chevron-right":
      return <path d="m9 5 7 7-7 7" />;
  }
}
