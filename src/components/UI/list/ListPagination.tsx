import { usePagination } from "@/hooks/usePagination";
import {
  Grid,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";

type ListPaginationProps = {
  total?: number;
};

const getPages = (size: number, total?: number) =>
  total ? Math.ceil(total / size) : 1;

const ListPagination: FC<ListPaginationProps> = ({ total }) => {
  const { page, size, setPaginationParams } = usePagination();
  let pages = getPages(size, total);

  const onChangeSize = (e: SelectChangeEvent) => {
    const newSize = e.target.value.toString();
    const newPages = getPages(parseInt(newSize), total);

    if (page > newPages) {
      setPaginationParams({ size: newSize, page: newPages.toString() });
    } else {
      setPaginationParams({ size: newSize });
    }
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Pagination
        count={pages}
        page={page}
        onChange={(_, value) => setPaginationParams({ page: value.toString() })}
        color="primary"
        sx={{ py: 2 }}
      />
      <Select value={size.toString()} onChange={onChangeSize}>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </Grid>
  );
};

export default ListPagination;
