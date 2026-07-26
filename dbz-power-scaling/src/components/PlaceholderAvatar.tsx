import React from "react";

interface PlaceholderAvatarProps {
  name: string;
  color: string;
  size: number;
}

export const PlaceholderAvatar: React.FC<PlaceholderAvatarProps> = ({
  name,
  color,
  size,
}) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at 35% 35%, ${color}dd, ${color})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: `3px solid ${color}`,
        boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
      }}
    >
      <span
        style={{
          fontSize: size * 0.38,
          fontWeight: 900,
          color: "white",
          fontFamily: "sans-serif",
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {initials}
      </span>
    </div>
  );
};
