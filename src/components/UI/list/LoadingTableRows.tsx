import { usePagination } from "@/hooks/usePagination";
import { Skeleton, TableCell, TableRow, useTheme } from "@mui/material";
import { FC } from "react";

type LoadingTableRowsProps = {
  cols?: number;
};

const LoadingTableRows: FC<LoadingTableRowsProps> = ({ cols = 1 }) => {
  const theme = useTheme();
  const { size } = usePagination();

  return Array.from({ length: size }, (_, rowNbr) => (
    <TableRow key={rowNbr}>
      {Array.from({ length: cols }, (_, colNbr) => (
        <TableCell key={colNbr}>
          <Skeleton />
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default LoadingTableRows;
