import type { PropsWithChildren } from "react";
import type { IconVariant } from "@/components/Icon";

export type TabsProps = PropsWithChildren<{}>;

export type TabProps = PropsWithChildren<{
  tabKey: string;
  label: string;
  icon?: IconVariant;
}>;
