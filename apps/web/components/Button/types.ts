import type { IconVariant } from "@/components/Icon";

export type ButtonProps = {
  onClick: () => void;
  isDisabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "small" | "large";
} & (
  | { label: string; icon?: IconVariant }
  | { icon: IconVariant; label?: string }
);
