import { Typography } from "@mui/material";

interface AppBarHeaderProps {
  title: string;
}

const AppBarTitle = ({ title }: AppBarHeaderProps) => {
  return (
    <Typography variant="h6" component="div" aria-label="Application header">
      {title}
    </Typography>
  );
};

export default AppBarTitle;
