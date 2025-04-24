import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

type EditDialogProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  editedName: string;
  onNameChange: (newName: string) => void;
};

const EditDialog = ({
  open,
  onClose,
  onConfirm,
  editedName,
  onNameChange,
}: EditDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="edit-dialog-title"
      aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">{"Edit Todo name"}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          label="Todo name"
          value={editedName}
          onChange={(e) => onNameChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;
