import React, { useState } from 'react';

import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableFooter,
  TablePagination,
  TableRow,
  Link,
  Divider,
  Toolbar,
  Button,
} from '@material-ui/core';

import {
  deleteAppliance as deleteApplianceAPI,
  addAppliance as addApplianceAPI,
  editAppliance as editApplianceAPI,
} from 'apis/appliances';

import DeleteApplianceDialog from 'components/DeleteApplianceDialog';
import ApplianceDialog from 'components/ApplianceDialog';

const requiredFields = [
  'serialNumber',
  'brand',
  'model',
  'status',
  'dateBought',
];

const AppliancesDataTable = props => {
  const {
    appliances,
    page,
    rowsPerPage,
    totalRows,
    handleChangePage,
    handleChangeRowsPerPage,
    getData,
  } = props;

  const [dialogFormData, setDialogFormData] = useState({});
  const [dialogFormErrors, setDialogFormErrors] = useState({});
  const [edit, setEdit] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [applianceMarker, setApplianceMarker] = useState(null);

  const onChangeDialogFormData = e => {
    setDialogFormData(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const showDialog = (e, id) => {
    if (e) e.preventDefault();

    setEdit(prevEdit => {
      if (prevEdit) {
        setDialogFormData({});
        setDialogFormErrors({});
      }
      return Boolean(id);
    });

    if (id) {
      const applianceToMark = appliances.find(
        appliance => appliance._id === id
      );
      const markedAppliance = {
        ...applianceToMark,
      };

      setApplianceMarker(applianceToMark);

      delete markedAppliance._id;
      delete markedAppliance.__v;
      delete markedAppliance.createdAt;
      delete markedAppliance.updatedAt;
      const dateToFormat = new Date(markedAppliance.dateBought);
      markedAppliance.dateBought = `${dateToFormat.getFullYear()}-${
        dateToFormat.getMonth() + 1
      }-${dateToFormat.getDate().toString().padStart(2, '0')}`;

      setDialogFormData(markedAppliance);
    }
    setDialogOpen(true);
  };

  const hideDialog = () => {
    setDialogOpen(false);
  };

  const showDeleteDialog = (e, id) => {
    e.preventDefault();

    setApplianceMarker(appliances.find(appliance => appliance._id === id));
    setDeleteDialogOpen(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const deleteAppliance = async (e, id) => {
    await deleteApplianceAPI(id);
    hideDeleteDialog();
    getData();
  };

  const addEditAppliance = async () => {
    const appliance = { ...dialogFormData };

    appliance.dateBought = Date.parse(appliance.dateBought);

    let res;

    if (edit) {
      res = await editApplianceAPI(applianceMarker._id, appliance);
    } else {
      res = await addApplianceAPI(appliance);
    }

    if (res.status === 200) {
      hideDialog();
      setDialogFormData({});
      setDialogFormErrors({});
      getData();
    }
  };

  const validateDialogForm = () => {
    setDialogFormErrors({});

    const isValid =
      JSON.stringify(requiredFields.sort()) ===
        JSON.stringify(Object.keys(dialogFormData).sort()) &&
      Object.entries(dialogFormData).reduce((acc, cur) => {
        if (cur[1].trim() === '') {
          setDialogFormErrors(prevErrors => ({
            ...prevErrors,
            [cur[0]]: true,
          }));

          return false;
        }

        return acc;
      }, true);

    if (isValid) addEditAppliance();
  };

  return (
    <Paper>
      <DeleteApplianceDialog
        open={deleteDialogOpen}
        hideDialog={hideDeleteDialog}
        appliance={applianceMarker}
        deleteAppliance={deleteAppliance}
      />
      <ApplianceDialog
        open={dialogOpen}
        hideDialog={hideDialog}
        formData={dialogFormData}
        onChangeFormData={onChangeDialogFormData}
        edit={edit}
        validateForm={validateDialogForm}
        errors={dialogFormErrors}
      />

      <Toolbar>
        <Box ml='auto'>
          <Button variant='contained' color='primary' onClick={showDialog}>
            Add new appliance
          </Button>
        </Box>
      </Toolbar>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date Bought</TableCell>
              <TableCell size='small'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appliances.map(appliance => (
              <TableRow hover key={appliance._id}>
                <TableCell>{appliance.serialNumber}</TableCell>
                <TableCell>{appliance.brand}</TableCell>
                <TableCell>{appliance.model}</TableCell>
                <TableCell>{appliance.status}</TableCell>
                <TableCell>
                  {new Date(appliance.dateBought).toDateString()}
                </TableCell>
                <TableCell size='small'>
                  <Box display='flex' justifyContent='flex-end'>
                    <Link href='#!' onClick={e => showDialog(e, appliance._id)}>
                      Edit
                    </Link>{' '}
                    <Box px={2}>
                      <Divider orientation='vertical' />
                    </Box>
                    <Link
                      href='#!'
                      onClick={e => showDeleteDialog(e, appliance._id)}>
                      Delete
                    </Link>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AppliancesDataTable;
