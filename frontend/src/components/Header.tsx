import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useState } from "react";

interface HeaderProps {
  header: string;
  onDelete: () => void;
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header = ({
  header,
  onDelete,
  toggleDarkMode,
  isDarkMode,
}: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    onDelete();
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ mt: 2 }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          {header}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" onClick={toggleDarkMode}>
          {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <IconButton color="inherit" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleDelete}>Delete all todos</MenuItem>
          <MenuItem onClick={handleMenuClose}>Close menu</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
