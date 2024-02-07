import { TextField } from "@mui/material";
import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

type FormInputProps = {
  name: string;
  control: Control<FieldValues>;
  label: string;
  helperText?: string;
};

const FormInputText: FC<FormInputProps> = ({
  name,
  control,
  label,
  helperText = null,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : helperText}
          error={!!error}
          label={label}
          value={value}
          onChange={onChange}
        />
      )}
    ></Controller>
  );
};

export default FormInputText;
