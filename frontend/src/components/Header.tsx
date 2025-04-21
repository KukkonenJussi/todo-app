import { Typography } from "@mui/material";

interface HeaderProps {
  header: string;
}

const Header = ({ header }: HeaderProps) => {
  return (
    <Typography variant="h4" component={"h1"} align="center" sx={{ mb: 4 }}>
      {header}
    </Typography>
  );
};

export default Header;
