import React from 'react';

interface CategoryBadgeProps {
  label: string;
  color?: string;
}

export function CategoryBadge({ label, color }: CategoryBadgeProps) {
  return (
    <span
      className="fjs-badge"
      style={color ? { borderColor: color, color } : undefined}>
      {label}
    </span>
  );
}
