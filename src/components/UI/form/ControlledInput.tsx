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
  fromInput?: (value: string) => string;
  toInput?: (value: TValue) => string;
};

const ControlledInput = <
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
>({
  name,
  label,
  type = "text",
  control,
  fromInput = (x) => x,
  toInput = (x) => x.toString(),
}: ControlledInputProps<TValue, TFieldValues>) => {
  const { error } = control.getFieldState(name);

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <TextField
          type={type}
          label={label}
          value={toInput(value)}
          onChange={(e) => onChange(fromInput(e.target.value))}
          error={!!error}
          helperText={error?.message}
          inputProps={{
            step: type === "number" ? "0.01" : undefined,
          }}
          fullWidth
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default ControlledInput;
