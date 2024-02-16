import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  Controller,
  FieldValue,
  FieldValues,
  Path,
} from "react-hook-form";

type ControlledInputProps<
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
> = {
  name: Path<TFieldValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  control: Control<TFieldValues>;
};

const ControlledInput = <
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
>({
  name,
  label,
  type = "text",
  control,
}: ControlledInputProps<TValue, TFieldValues>) => {
  const { error } = control.getFieldState(name);

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <TextField
          type={type}
          label={label}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error?.message}
          fullWidth
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default ControlledInput;
