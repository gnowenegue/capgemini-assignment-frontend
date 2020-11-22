import React from 'react';

import { Box, Paper, Grid, TextField, Button } from '@material-ui/core';
import { Search as SearchIcon, Clear as ClearIcon } from '@material-ui/icons';

const AppliancesFilter = props => {
  const { formData, onChangeFormData, resetForm, submitForm } = props;

  return (
    <Paper>
      <form onSubmit={submitForm}>
        <Box p={4}>
          <Grid container spacing={3} justify='center' alignItems='center'>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Serial Number'
                InputLabelProps={{
                  shrink: true,
                }}
                name='serialNumber'
                value={formData.serialNumber || ''}
                onChange={onChangeFormData}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Brand'
                InputLabelProps={{
                  shrink: true,
                }}
                name='brand'
                value={formData.brand || ''}
                onChange={onChangeFormData}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Model'
                InputLabelProps={{
                  shrink: true,
                }}
                name='model'
                value={formData.model || ''}
                onChange={onChangeFormData}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Status'
                InputLabelProps={{
                  shrink: true,
                }}
                name='status'
                value={formData.status || ''}
                onChange={onChangeFormData}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Date Bought'
                type='date'
                InputLabelProps={{
                  shrink: true,
                }}
                name='dateBought'
                value={formData.dateBought || ''}
                onChange={onChangeFormData}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box display='flex' justifyContent='flex-end'>
                <Box mr={1}>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    startIcon={<SearchIcon />}>
                    Search
                  </Button>
                </Box>
                <Box ml={1}>
                  <Button
                    onClick={resetForm}
                    type='reset'
                    variant='contained'
                    startIcon={<ClearIcon />}>
                    Clear
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Paper>
  );
};

export default AppliancesFilter;
