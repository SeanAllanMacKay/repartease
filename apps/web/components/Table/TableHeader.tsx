import styles from "./Table.module.css";

import type { TableHeaderProps } from "./types";

export const TableHeader = ({ children }: TableHeaderProps) => {
  return <th className={styles.th}>{children}</th>;
};
