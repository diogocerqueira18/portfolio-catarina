import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './pages/Login';
import { Admin } from './pages/Admin';
import { Home } from './pages/Home';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = document.cookie.includes('isAdminLoggedIn=true');
  
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          } 
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;