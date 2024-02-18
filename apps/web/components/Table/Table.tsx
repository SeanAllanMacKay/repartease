import get from "lodash.get";

import { TableRow } from "./TableRow";
import { TableHeader } from "./TableHeader";
import { TableCell } from "./TableCell";

import styles from "./Table.module.css";

import { TableProps } from "./types";

export const Table = <T,>({ columns, rows }: TableProps<T>) => {
  const getValue = (row, dataKey, format) => {
    const value = get(row, dataKey);

    if (value && format) {
      return format({ value });
    }

    return value;
  };

  return (
    <table className={styles.table}>
      <thead>
        <TableRow isHeader>
          {columns.map(({ dataKey, label }, index) => (
            <TableHeader key={index}>{label}</TableHeader>
          ))}
        </TableRow>
      </thead>

      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {columns.map(({ dataKey, format }, index) => (
              <TableCell key={index}>
                {getValue(row, dataKey, format)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </table>
  );
};
