import { useMemo } from "react";

import { ICON_MAPPING } from "./constants";

import type { IconProps } from "./types";

export const Icon = ({
  variant,
  size = 24,
  color,
  weight = "bold",
}: IconProps) => {
  const IconComponent = useMemo(() => ICON_MAPPING[variant], [variant]);

  return (
    <IconComponent weight="bold" size={size} weight={weight} color={color} />
  );
};
