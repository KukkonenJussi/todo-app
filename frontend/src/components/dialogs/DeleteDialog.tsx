import { TodoItem } from "../../types";
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
  todo: TodoItem | null;
  onClose: () => void | Promise<void>;
  onConfirm: () => void | Promise<void>;
};

const DeleteDialog = ({
  open,
  onClose,
  todo,
  onConfirm,
}: DeleteDialogProps) => {
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
          {`Delete Todo '${todo?.name}'?`}
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

export default DeleteDialog;
