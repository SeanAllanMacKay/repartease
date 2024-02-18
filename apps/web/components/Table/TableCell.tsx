import styles from "./Table.module.css";

import type { TableCellProps } from "./types";

export const TableCell = ({ children }: TableCellProps) => {
  return <td className={styles.td}>{children}</td>;
};
