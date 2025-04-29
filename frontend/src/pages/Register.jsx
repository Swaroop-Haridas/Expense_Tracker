import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/register', { username, email, password });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response.data.message || 'Registration failed.');
    }
  };

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4 max-w-md mx-auto mb-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 rounded">
        Register
      </button>
    </form>
  );
}

export default Register;
