import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type ControlledInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  type?: HTMLInputTypeAttribute;
  control: Control<TFieldValues>;
  modify?: (value: string) => string;
};

const ControlledInput = <TFieldValues extends FieldValues>({
  name,
  label,
  type = "text",
  control,
  modify = (x) => x,
}: ControlledInputProps<TFieldValues>) => {
  const { error } = control.getFieldState(name);

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <TextField
          type={type}
          label={label}
          value={value}
          onChange={(e) => onChange(modify(e.target.value))}
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
