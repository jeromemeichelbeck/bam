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
  onSearch?: (q: string) => void;
  clearable?: boolean;
  // Select can work on objects, so we need to specify the key and label
  object?: { optionKey: keyof TValue; optionLabel: keyof TValue };
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
  onSearch,
  clearable = false,
  object,
}: ControlledSelectProps<TValue, TFieldValues>) => {
  const optionKey = object?.optionKey;
  const optionLabel = object?.optionLabel;

  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          id={`${name}-select`}
          value={optionKey ? value?.[optionKey] : value}
          onChange={(_, newValue) => {
            onChange(optionKey ? newValue?.[optionKey] : newValue);
            if (!newValue && onSearch) {
              onSearch("");
            }
          }}
          options={options}
          getOptionLabel={(option) =>
            optionKey
              ? optionLabel
                ? `${option[optionLabel]} (ID: ${option[optionKey]})`
                : option[optionKey]
              : option
          }
          disableClearable={!clearable}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              fullWidth
              inputProps={{
                ...params.inputProps,
                autoComplete: "off", // disable autocomplete and autofill
              }}
              onChange={(e) => {
                if (onSearch) {
                  onSearch(e.target.value);
                }
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
