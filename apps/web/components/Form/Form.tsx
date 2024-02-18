import { PropsWithChildren } from "react";
import { FormProvider } from "react-hook-form";

import type { UseFormReturn, FieldValues } from "react-hook-form";

export const Form = <T extends FieldValues>({
  children,
  form,
}: PropsWithChildren<{ form: UseFormReturn<T> }>) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};
