import { Typography } from "@mui/material";

interface AppBarHeaderProps {
  title: string;
}

const AppBarTitle = ({ title }: AppBarHeaderProps) => {
  return (
    <Typography variant="h6" component="div">
      {title}
    </Typography>
  );
};

export default AppBarTitle;
