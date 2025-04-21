import React, { useState } from "react";
import Button from '@mui/material/Button'

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
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <Button variant="contained" type="submit">Add</Button>
    </form>
  );
};

export default AddTodoForm;
