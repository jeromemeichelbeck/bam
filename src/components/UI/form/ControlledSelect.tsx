import { Autocomplete, TextField, UseAutocompleteProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValue,
  FieldValues,
  Path,
} from "react-hook-form";

type ControlledSelectProps<
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
> = {
  defaultValue?: TValue;
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  options: UseAutocompleteProps<TValue, boolean, boolean, boolean>["options"];
  clearable?: boolean;
};

const ControlledSelect = <
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
>({
  defaultValue,
  control,
  name,
  label,
  options,
  clearable = false,
}: ControlledSelectProps<TValue, TFieldValues>) => {
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          id={`${name}-select`}
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          options={options}
          disableClearable={!clearable}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              inputProps={{
                ...params.inputProps,
                autoComplete: "disabled", // disable autocomplete and autofill
              }}
            />
          )}
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

export default ControlledSelect;
