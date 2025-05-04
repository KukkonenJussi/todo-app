import { AppBar, Box, Toolbar } from "@mui/material";

import AppBarTitle from "./AppBarTitle";
import DarkModeToggle from "./DarkModeToggle";
import AppBarMenu from "./AppBarMenu";

interface AppHeaderProps {
  onDelete: () => void;
  toggleDarkMode: () => void;
}

const AppHeader = ({ onDelete, toggleDarkMode }: AppHeaderProps) => {
  return (
    <AppBar position="static" sx={{ mt: 2 }}>
      <Toolbar>
        <AppBarTitle title="Todo App" />
        <Box sx={{ flexGrow: 1 }} />

        <DarkModeToggle toggleDarkMode={toggleDarkMode} isDarkMode />
        <AppBarMenu onDelete={onDelete} />
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
