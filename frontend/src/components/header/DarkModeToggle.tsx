import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

interface DarkModeToggleProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const DarkModeToggle = ({
  isDarkMode,
  toggleDarkMode,
}: DarkModeToggleProps) => {
  return (
    <IconButton
      color="inherit"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
      role="button"
    >
      {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default DarkModeToggle;
