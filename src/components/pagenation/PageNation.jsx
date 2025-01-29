import { Pagination, ThemeProvider } from '@mui/material';
import React from 'react'
import theme from './pageTheme';

function PageNation({ totalpage, setPage,page }) {
    const handlePageChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className="flex justify-end">
      <ThemeProvider theme={theme}>
        <Pagination  count={totalpage} onChange={handlePageChange}  />
      </ThemeProvider>
    </div>
  );
}

export default PageNation
