import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';

const ApplianceDialog = props => {
  const {
    open,
    hideDialog,
    formData,
    onChangeFormData,
    addEditAppliance,
    edit,
  } = props;

  return (
    <Dialog open={open} onClose={hideDialog}>
      <DialogTitle>{edit ? 'Edit appliance' : 'Add new appliance'}</DialogTitle>

      <DialogContent>
        <TextField
          label='Serial Number'
          margin='normal'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='serialNumber'
          value={formData.serialNumber || ''}
          onChange={onChangeFormData}
        />
        <TextField
          label='Brand'
          margin='normal'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='brand'
          value={formData.brand || ''}
          onChange={onChangeFormData}
        />
        <TextField
          label='Model'
          margin='normal'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='model'
          value={formData.model || ''}
          onChange={onChangeFormData}
        />
        <TextField
          label='Status'
          margin='normal'
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          name='status'
          value={formData.status || ''}
          onChange={onChangeFormData}
        />
        <TextField
          label='Date Bought'
          margin='normal'
          fullWidth
          type='date'
          InputLabelProps={{
            shrink: true,
          }}
          name='dateBought'
          defaultValue={formData.dateBought || ''}
          value={formData.dateBought || ''}
          onChange={onChangeFormData}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={hideDialog}>Cancel</Button>
        <Button onClick={addEditAppliance} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplianceDialog;
