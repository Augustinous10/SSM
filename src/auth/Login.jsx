// import React, { useState } from 'react';
// import { useAuth } from './AuthContext';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     const fakeUser = { email, role: email === 'admin@example.com' ? 'admin' : 'user' };
//     login(fakeUser);
//     navigate('/dashboard');
//   };

//   return (
//     <div className="auth-container">
//       <h2>Login</h2>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;
