import { TableCell, TableRow } from "@mui/material";
import { useTheme } from "@mui/system";
import { ReactNode } from "react";

type ListRowProps<TData extends ReactNode> = {
  data: TData[];
  bgcolor: string;
  onClick: () => void;
};

const ListRow = <TData extends ReactNode>({
  data,
  bgcolor,
  onClick,
}: ListRowProps<TData>) => {
  const theme = useTheme();

  return (
    <TableRow
      onClick={onClick}
      sx={{
        cursor: "pointer",
        bgcolor,
        ":hover": {
          bgcolor: theme.palette.action.hover,
        },
      }}
    >
      {data.map((value, index) => (
        <TableCell key={index}>{value}</TableCell>
      ))}
    </TableRow>
  );
};

export default ListRow;
