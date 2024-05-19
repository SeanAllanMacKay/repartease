import { PropsWithChildren } from "react";
import { FormProvider, useForm as RHFuseForm } from "react-hook-form";
import React from "react";

import type { UseFormReturn, FieldValues, UseFormProps } from "react-hook-form";

export const Form = <T extends FieldValues>({
  children,
  form,
}: PropsWithChildren<{ form: UseFormReturn<T> }>) => {
  return <FormProvider {...form}>{children}</FormProvider>;
};

export {
  useFormContext,
  useFieldArray,
  useWatch,
  useController,
} from "react-hook-form";

export const useForm = <T extends FieldValues>(
  args?: Partial<UseFormProps<T>>
) => {
  return RHFuseForm<T>({
    mode: "all",
    reValidateMode: "onChange",
    delayError: 200,
    ...args,
  });
};
