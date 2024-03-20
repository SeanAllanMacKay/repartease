import React, { useMemo } from "react";

import {} from "@phosphor-icons/react";

export const iconMapping = {};

export const Icon = ({
  variant,
  size = 20,
  color = "white",
  weight = "regular",
}: {
  variant: keyof typeof iconMapping;
  size?: number;
  color?: string;
  weight?: "light" | "regular";
}) => {
  const IconComponent = useMemo(() => iconMapping[variant], [variant]);

  return IconComponent ? (
    <IconComponent size={size} color={color} weight={weight} />
  ) : null;
};
