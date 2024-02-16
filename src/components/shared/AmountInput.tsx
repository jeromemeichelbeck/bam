import { limitDecimals } from "@/utils/formatting/limitDecimals";
import { Control, FieldValues, Path } from "react-hook-form";
import ControlledInput from "../UI/form/ControlledInput";

type AmountInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  control: Control<TFieldValues>;
};

const AmountInput = <TFieldValues extends FieldValues>({
  name,
  label = "Amount",
  control,
}: AmountInputProps<TFieldValues>) => {
  return (
    <ControlledInput
      type="number"
      label={label}
      name={name}
      control={control}
      // Limit to 2 decimals
      fromInput={(value) => Math.round(parseFloat(value) * 100).toString()}
      toInput={(value) => limitDecimals(parseFloat(value) / 100, 2)}
    />
  );
};

export default AmountInput;
