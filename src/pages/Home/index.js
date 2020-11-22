import React, { useState, useEffect } from 'react';

import { Box } from '@material-ui/core';

import AppliancesFilter from 'components/AppliancesFilter';
import AppliancesDataTable from 'components/AppliancesDataTable';

import { getAppliances } from 'apis/appliances';

const Home = () => {
  const [appliances, setAppliances] = useState([]);

  const [filterFormData, setFilterFormData] = useState({});

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  const getData = async () => {
    const filters = { ...filterFormData };

    if (filterFormData.dateBought) {
      filters.dateBought = Date.parse(filters.dateBought);
    }

    const appliances = await getAppliances(page + 1, rowsPerPage, filters);

    setAppliances(appliances.data);
    setTotalRows(+appliances.headers['x-total-count']);
  };

  useEffect(() => {
    getData();

    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

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
