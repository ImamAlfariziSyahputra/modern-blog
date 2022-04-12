import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { wrapper } from '@/redux/store/store';
// material
import {
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Card,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import AddIcon from '@mui/icons-material/Add';
// components
import Label from '@/components/Label';
import SearchNotFound from '@/components/SearchNotFound';
import {
  TableListHead,
  TableListToolbar,
  TableActionMenu,
} from '@/components/table';
// Apis
import {
  getPosts,
  useGetPostsQuery,
  getRunningOperationPromises,
} from '@/redux/apis/postApi';

const TABLE_HEAD = [
  { id: 'title', label: 'Title' },
  { id: 'slug', label: 'Slug' },
  { id: 'content', label: 'Content' },
  { id: 'category', label: 'Category' },
  { id: 'status', label: 'Status' },
  { id: '' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_post) => _post.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Blog({ postsApi }) {
  // console.log('postsApi => ', postsApi);
  const router = useRouter();
  // const { data: post, isLoading, isSuccess } = postsApi;
  const {
    data: post,
    isLoading,
    isSuccess,
    refetch,
    isFetching,
  } = useGetPostsQuery();
  const _posts = post || [];

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('title');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = _posts.map((n) => n.title);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, title) => {
    const selectedIndex = selected.indexOf(title);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, title);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - _posts.length) : 0;

  const filteredDatas = applySortFilter(
    _posts,
    getComparator(order, orderBy),
    filterName
  );

  const isDataNotFound = filteredDatas.length === 0;
  return (
    <>
      <div className="flex justify-end">
        <button
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-800 text-white p-2.5 px-4 rounded-lg shadow-xl hover:shadow-none font-bold mb-4 mr-4 disabled:cursor-not-allowed"
          onClick={refetch}
          disabled={isFetching}
        >
          {isFetching ? (
            <div className="flex items-center justify-center px-5">
              <CircularProgress color="inherit" size="1rem" />
            </div>
          ) : (
            'Refresh'
          )}
        </button>
        <button
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-800 text-white p-2.5 px-4 rounded-lg shadow-xl hover:shadow-none font-bold mb-4"
          onClick={() => router.push('/blog/add')}
        >
          <AddIcon fontSize="small" />
          <span>New Post</span>
        </button>
      </div>
      <Card variant="outlined">
        <TableListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />
        {/* <Scrollbar> */}
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={_posts.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredDatas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const { id, title, slug, content, category, status } = row;
                  const isItemSelected = selected.indexOf(title) !== -1;
                  return (
                    <TableRow
                      hover
                      key={id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                      aria-checked={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, title)}
                        />
                      </TableCell>
                      <TableCell align="left">{title}</TableCell>
                      <TableCell align="left">{slug}</TableCell>
                      <TableCell align="left">{content}</TableCell>
                      <TableCell align="left">{category}</TableCell>
                      <TableCell align="left">
                        <Label
                          variant="ghost"
                          color={
                            (status === 'published' && 'secondary') || 'error'
                          }
                        >
                          {sentenceCase(status)}
                        </Label>
                      </TableCell>
                      <TableCell align="right">
                        <TableActionMenu id={slug} name={title} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isDataNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {/* </Scrollbar> */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={_posts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      postsApi: [],
    },
  };
}
// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (ctx) => {
//     store.dispatch(getPosts.initiate());

//     let postsApi = await Promise.all(getRunningOperationPromises());

//     // console.log('postsApi => ', postsApi);

//     return {
//       props: {
//         postsApi: postsApi[0],
//       },
//     };
//   }
// );
