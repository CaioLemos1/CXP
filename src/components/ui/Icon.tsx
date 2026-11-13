import type { IconName } from "@/content/solutions";

type IconProps = {
  name:
    | IconName
    | "whatsapp"
    | "arrow-up-right"
    | "arrow-right"
    | "instagram"
    | "mail"
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
    case "seal":
      return (
        <>
          <circle cx="12" cy="10" r="6" />
          <path d="m9.5 10 1.75 1.75L14.75 8.5" />
          <path d="M8.5 15 7 21l5-2.5 5 2.5-1.5-6" />
        </>
      );
    case "compass":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5z" />
        </>
      );
    case "scale":
      return (
        <>
          <path d="M12 4v16M7 20h10M5 7h14" />
          <path d="m5 7-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0z" />
        </>
      );
    case "podium":
      return (
        <>
          <rect x="9" y="3" width="6" height="9" rx="3" />
          <path d="M6 11a6 6 0 0 0 12 0M12 17v4M8 21h8" />
        </>
      );
    case "cup":
      return (
        <>
          <path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" />
          <path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 3v3M12 3v3" />
        </>
      );
    case "whatsapp":
      return (
        <path d="M12 2.2a9.75 9.75 0 0 0-8.4 14.7L2.3 21.8l5-1.3A9.75 9.75 0 1 0 12 2.2Zm0 17.8a8.05 8.05 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.07 8.07 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.1 3.6c1.5.7 2.1.7 2.9.6a2.4 2.4 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c0-.1-.2-.2-.4-.3Z" />
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
