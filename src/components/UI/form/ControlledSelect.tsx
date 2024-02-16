import { Autocomplete, TextField, UseAutocompleteProps } from "@mui/material";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldValue,
  FieldValues,
  Path,
  useController,
} from "react-hook-form";

type ControlledSelectProps<
  TValue extends FieldValue<TFieldValues>,
  TFieldValues extends FieldValues,
> = {
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

  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  // Reset the value if it's not found in the options
  useEffect(() => {
    if (
      optionKey &&
      options?.length &&
      options.length > 0 &&
      value &&
      !options.find(({ id }) => id === value)
    ) {
      onChange(null);
    }
  }, [optionKey, value, options, onChange]);
  return (
    <Controller
      render={({ field: { name, value, onChange } }) => {
        // Compute the value to pass to the Autocomplete component
        // 1. If the optionKey is defined, we need to find the option in the options array
        // 2. If the optionKey is not defined, we can use the value as is
        const autocompleteValue = optionKey
          ? options.find(({ id }) => id === value) ?? null
          : value;

        return (
          <Autocomplete
            id={`${name}-select`}
            value={autocompleteValue}
            onChange={(_, newValue) => {
              onChange((optionKey ? newValue?.[optionKey] : newValue) ?? null);
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
                error={!!error}
                helperText={error?.message}
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
        );
      }}
      name={name}
      control={control}
    />
  );
};

export default ControlledSelect;
