import { availableCurrencies } from "@/constants/currencies";
import { AccountFormDTO } from "@/schemas/account";
import { Currency } from "@/types/currency";
import { Autocomplete, TextField } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type CurrencySelectorProps = {
  defaultCurrency?: Currency;
  control: Control<AccountFormDTO>;
};

const CurrencySelect: React.FC<CurrencySelectorProps> = ({
  defaultCurrency,
  control,
}) => {
  return (
    <Controller
      render={({ field: { value, onChange } }) => (
        <Autocomplete
          id="currency-select"
          value={value}
          onChange={(_, newValue) => onChange(newValue)}
          options={availableCurrencies}
          disableClearable
          renderInput={(params) => (
            <TextField
              {...params}
              label="Account Currency"
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
      name="currency"
      control={control}
      defaultValue={defaultCurrency || "EUR"}
    />
  );
};

export default CurrencySelect;
