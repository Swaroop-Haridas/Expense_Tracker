import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const isLoggedIn = localStorage.getItem('token');
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:5000/api/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
    }
  }, [token]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <nav className="bg-white shadow-md p-4 flex justify-between">
        {user && <span className="text-gray-500 mr-4">👋 Hi, {user.username}</span>}
          <h1 className="text-2xl font-bold text-gray-700">Expense Tracker</h1>
          <div className="space-x-4 flex items-center">
            <Link to="/" className="text-blue-500 hover:underline">| Home |</Link>
            <Link to="/dashboard" className="text-blue-500 hover:underline">| Dashboard |</Link>
            {!isLoggedIn && (
              <>
                <Link to="/login" className="text-blue-500 hover:underline">| Login |</Link>
                <Link to="/register" className="text-blue-500 hover:underline">| Register |</Link>
              </>
            )}
            {isLoggedIn && (
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        <main className="flex-1 flex justify-center items-start p-8">
          <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
