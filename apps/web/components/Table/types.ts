import { PropsWithChildren } from "react";

export type TableColumnType<T> = {
  label: string;
  dataKey: keyof T;
  format?: (args: { value: any }) => any;
};

export type TableRowType<T> = T;

export type TableHeaderProps = PropsWithChildren<{}>;

export type TableCellProps = PropsWithChildren<{}>;

export type TableRowProps = PropsWithChildren<{ isHeader?: boolean }>;

export type TableProps<T> = {
  columns: TableColumnType<T>[];
  rows: TableRowType<T>[];
};
