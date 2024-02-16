import { TextField, TextFieldProps } from "@mui/material";
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
  control: Control<TFieldValues>;
  fromInput?: (value: string) => string;
  toInput?: (value: TValue) => string;
} & TextFieldProps;

const ControlledInput = <
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
>({
  name,
  type,
  control,
  fullWidth = true,
  fromInput = (x) => x,
  toInput = (x) => x.toString(),
  ...controlledInputProps
}: ControlledInputProps<TValue, TFieldValues>) => {
  const { error } = control.getFieldState(name);

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <TextField
          {...controlledInputProps}
          type={type}
          value={toInput(value)}
          onChange={(e) => onChange(fromInput(e.target.value))}
          error={!!error}
          helperText={error?.message}
          inputProps={{
            step: type === "number" ? "0.01" : undefined,
          }}
          fullWidth={fullWidth}
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default ControlledInput;
