import { useMemo } from "react";

import styles from "./Tabs.module.css";

import type { TabProps } from "./types";

export const Tab = ({ children }: TabProps) => {
  return <div className={styles.tabContainer}>{children}</div>;
};
