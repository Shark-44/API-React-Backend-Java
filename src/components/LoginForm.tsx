import { useState, FormEvent } from 'react';
import axios from 'axios';
import './LoginForm.css';


type LoginFormProps = {
  onClose: () => void;
}

function LoginForm({ onClose }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/login?username=${username}&password=${password}`
      );
      console.log(response.data); 

      onClose(); // Close the modal on successful login
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message); 
      } else {
        setError('Unknown error occurred'); 
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='loginform'>
      <div>
        <label>Username:</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className='error'>{error}</div>}
      <button type='submit'>Login</button>
    </form>
  );
}; 

export default LoginForm;
