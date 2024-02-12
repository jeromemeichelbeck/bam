import { TableCell, TableRow, useTheme } from "@mui/material";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";

type LoadingTableRowsProps = {
  rows?: number;
  cols?: number;
};

const LoadingTableRows: FC<LoadingTableRowsProps> = ({
  rows = 1,
  cols = 1,
}) => {
  const theme = useTheme();

  return Array.from({ length: rows }, (_, rowNbr) => (
    <TableRow key={rowNbr}>
      {Array.from({ length: cols }, (_, colNbr) => (
        <TableCell key={colNbr}>
          <Skeleton baseColor={theme.palette.primary.main} />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default LoadingTableRows;
