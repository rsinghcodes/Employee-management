import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from '@mui/material';

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props;

  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={() => setConfirmDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{confirmDialog.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmDialog.subTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={confirmDialog.onConfirm}
          autoFocus
          disableElevation
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
