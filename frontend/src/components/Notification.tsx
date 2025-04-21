import { Alert, Collapse } from "@mui/material";

interface NotificationProps {
  message: string | null;
}

const Notification = ({ message }: NotificationProps) => {
  if (!message) return null;

  let severity: "success" | "warning" | "error";

  if (message.toLowerCase().includes("required")) {
    severity = "warning";
  } else if (
    message.toLowerCase().includes("exists") ||
    message.toLowerCase().includes("less")
  ) {
    severity = "error";
  } else {
    severity = "success";
  }

  return (
    <Collapse in={true}>
      <Alert severity={severity}>{message}</Alert>
    </Collapse>
  );
};

export default Notification;
