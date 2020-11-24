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
    edit,
    validateForm,
    errors,
  } = props;

  return (
    <Dialog open={open} onClose={hideDialog}>
      <DialogTitle>{edit ? 'Edit appliance' : 'Add new appliance'}</DialogTitle>

      <DialogContent>
        <form>
          <TextField
            label='Serial Number'
            margin='normal'
            fullWidth
            required
            error={!!errors.serialNumber}
            helperText={errors.serialNumber && 'Please enter brand.'}
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
            required
            error={!!errors.brand}
            helperText={errors.brand && 'Please enter serial number.'}
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
            required
            error={!!errors.model}
            helperText={errors.model && 'Please enter model.'}
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
            required
            error={!!errors.status}
            helperText={errors.status && 'Please enter status.'}
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
            required
            error={!!errors.dateBought}
            helperText={errors.dateBought && 'Please enter purchase date.'}
            type='date'
            InputLabelProps={{
              shrink: true,
            }}
            name='dateBought'
            defaultValue={formData.dateBought || ''}
            value={formData.dateBought || ''}
            onChange={onChangeFormData}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={hideDialog}>Cancel</Button>
        <Button onClick={validateForm} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApplianceDialog;
