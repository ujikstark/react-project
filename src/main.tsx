import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'

import { AuthProvider } from './contexts/auth-context.tsx';
import UserDetails from './pages/users/user-details.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* <Routes> */}
        {/* <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users/:id" element={<UserDetails />} /> */}
        {/* <Route path="/users/:id/edit" element={<UserEdit />} /> */}
        {/* </Routes> */}
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
