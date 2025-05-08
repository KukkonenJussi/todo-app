import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void | Promise<void>;
  onConfirm: () => void | Promise<void>;
};

const DeleteAllDialog = ({ open, onClose, onConfirm }: DeleteDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={() => {
        void onClose();
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete confirmation"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`Delete all todos?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            void onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            void onConfirm();
          }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteAllDialog;
