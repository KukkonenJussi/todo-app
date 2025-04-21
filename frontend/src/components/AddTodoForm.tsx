import React, { useState } from "react";

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
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodoForm;
