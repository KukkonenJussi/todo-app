import axios from 'axios';
import { useEffect } from 'react';

const baseUrl = import.meta.env.VITE_API_BASE_URL

const App = () => {

  useEffect(() => {
    axios.get(`${baseUrl}/todos`).then((response) => {
      console.log(response.data)
    })
  })

  return (
    <div>
      <h1>Todo App</h1>
    </div>
  );
};

export default App;