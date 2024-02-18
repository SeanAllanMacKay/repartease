import styles from "./Table.module.css";

import type { TableRowProps } from "./types";

export const TableRow = ({ children, isHeader = false }: TableRowProps) => {
  return (
    <tr className={`${styles.tr} ${isHeader ? styles.headerRow : ""}`}>
      {children}
    </tr>
  );
};
