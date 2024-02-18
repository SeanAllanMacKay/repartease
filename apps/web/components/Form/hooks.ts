import { useForm as RHFuseForm } from "react-hook-form";

import type { UseFormProps, FieldValues } from "react-hook-form";

export {
  useFormContext,
  useFieldArray,
  useWatch,
  useController,
} from "react-hook-form";

export const useForm = <T extends FieldValues>(
  args?: Partial<UseFormProps<T>>,
) => {
  return RHFuseForm<T>({
    mode: "all",
    reValidateMode: "onChange",
    delayError: 200,
    ...args,
  });
};
