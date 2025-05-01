import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { useEffect, useState } from "react";

interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  if (!message) return null;

  let severity: "success" | "warning" | "error";

  if (message.toLowerCase().includes("required")) {
    severity = "warning";
  } else if (
    message.toLowerCase().includes("exists") ||
    message.toLowerCase().includes("less") ||
    message.toLowerCase().includes("list")
  ) {
    severity = "error";
  } else {
    severity = "success";
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
