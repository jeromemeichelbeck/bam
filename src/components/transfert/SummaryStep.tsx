import { FC } from "react";
import { TransfertStepperProps } from "./TransfertStepper";

const SummaryStep: FC<TransfertStepperProps> = ({ control }) => {
  return (
    <div>
      <h2>Summary</h2>
      <p>Summary of the transfert</p>
    </div>
  );
};

export default SummaryStep;
