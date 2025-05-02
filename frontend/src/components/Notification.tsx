import { Alert, Snackbar, SnackbarCloseReason, useTheme } from "@mui/material";
import { green, orange, red } from "@mui/material/colors";
import { useEffect, useState } from "react";

interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

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
      <Alert
        onClose={handleClose}
        severity={severity}
        variant={theme.palette.mode === "light" ? "standard" : "filled"}
        sx={{
          ...(theme.palette.mode === "dark" && {
            color: "#fff",
            backgroundColor:
              severity === "success"
                ? green[800]
                : severity === "error"
                ? red[800]
                : orange[800],
          }),
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
