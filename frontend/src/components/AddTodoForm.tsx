import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, TextField } from "@mui/material";

interface AddTodoFormProps {
  onSubmit: (name: string) => void;
}

const AddTodoForm = ({ onSubmit }: AddTodoFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(name);
    setName("");
  };

  return (
    <Box sx={{ my: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} gap={1}>
          <TextField
            label="Add item"
            value={name}
            onChange={(event) => setName(event.target.value)}
            fullWidth
          />
          <Button color="inherit" variant="contained" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddTodoForm;
