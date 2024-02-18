export type FormFieldProps = {
  name: string;
  label?: string;
  helper?: string;
  error?: string;
  validate?: Record<
    string,
    (
      value: any,
      allValues: any,
    ) => Promise<string | undefined> | string | undefined
  >;
  onChange?: (value: any) => void;
  dependsOn?: string[];
  component: React.FC<any>;
  unregisterOnUnmount?: boolean;
};
