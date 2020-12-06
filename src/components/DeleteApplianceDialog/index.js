import React from 'react';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import PropTypes from 'prop-types';

const DeleteApplianceDialog = props => {
  const { open, hideDialog, appliance, deleteAppliance } = props;

  return (
    <Dialog open={open} onClose={hideDialog}>
      <DialogTitle>Delete this appliance?</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this appliance?
          <List dense>
            <ListItem dense>
              <ListItemText
                primary={`Serial Number: ${appliance?.serialNumber}`}
              />
            </ListItem>
            <ListItem dense>
              <ListItemText primary={`Brand: ${appliance?.brand}`} />
            </ListItem>
            <ListItem dense>
              <ListItemText primary={`Model: ${appliance?.model}`} />
            </ListItem>
          </List>
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={hideDialog}>Cancel</Button>
        <Button
          onClick={e => deleteAppliance(e, appliance._id)}
          color='primary'
          autoFocus>
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DeleteApplianceDialog.propTypes = {
  open: PropTypes.bool,
  hideDialog: PropTypes.func,
  appliance: PropTypes.object,
  deleteAppliance: PropTypes.func,
};

export default DeleteApplianceDialog;
