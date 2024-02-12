import { AVAILABLE_SIZES } from "@/constants/pagination";
import { usePagination } from "@/hooks/usePagination";
import {
  FormControl,
  FormHelperText,
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
    <Grid container justifyContent="space-between" alignItems="center" py={2}>
      <Pagination
        count={pages}
        page={page}
        onChange={(_, value) => setPaginationParams({ page: value.toString() })}
        color="primary"
        sx={{ py: 2 }}
      />
      <FormControl>
        <FormHelperText>Results per page</FormHelperText>
        <Select size="small" value={size.toString()} onChange={onChangeSize}>
          {AVAILABLE_SIZES.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  );
};

export default ListPagination;
