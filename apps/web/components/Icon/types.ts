import { ICON_MAPPING } from "./constants";

export type IconVariant = keyof typeof ICON_MAPPING;

export type IconProps = {
  variant: IconVariant;
  size?: number;
};
