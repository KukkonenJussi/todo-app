import { AppBar, Box, Toolbar } from "@mui/material";

import AppBarTitle from "./AppBarTitle";
import DarkModeToggle from "./DarkModeToggle";
import AppBarMenu from "./AppBarMenu";

interface HeaderProps {
  onDelete: () => void;
  toggleDarkMode: () => void;
}

const Header = ({ onDelete, toggleDarkMode }: HeaderProps) => {
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

export default Header;
