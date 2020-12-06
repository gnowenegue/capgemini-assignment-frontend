import React, { useState, useEffect, useCallback } from 'react';

import { Box } from '@material-ui/core';

import AppliancesFilter from 'components/AppliancesFilter';
import AppliancesDataTable from 'components/AppliancesDataTable';

import { getAppliances } from 'apis/appliances';

const Home = () => {
  const [appliances, setAppliances] = useState([]);

  const [filterFormData, setFilterFormData] = useState({});
  const [filters, setFilters] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const getData = useCallback(async () => {
    const _filters = { ...filters };

    if (filters.dateBought) {
      _filters.dateBought = Date.parse(_filters.dateBought);
    }

    const appliances = await getAppliances(page + 1, rowsPerPage, _filters);

    setAppliances(appliances.data);
    setTotalRows(+appliances.headers['x-total-count']);
  }, [filters, page, rowsPerPage]);

  useEffect(() => {
    getData();

  }, [getData]);

  const onChangeFilterFormData = e => {
    setFilterFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const resetFilterForm = () => {
    setFilterFormData({});
  };

  const submitFilterForm = e => {
    e.preventDefault();
    setFilters(filterFormData);
    getData();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(+e.target.value);
    setPage(0);
  };

  return (
    <>
      <Box textAlign='center' mb={5}>
        <h1>Appliances Manager</h1>
      </Box>

      <Box mb={4}>
        <AppliancesFilter
          formData={filterFormData}
          onChangeFormData={onChangeFilterFormData}
          resetForm={resetFilterForm}
          submitForm={submitFilterForm}
        />
      </Box>

      <AppliancesDataTable
        appliances={appliances}
        page={page}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        getData={getData}
      />
    </>
  );
};

export default Home;
