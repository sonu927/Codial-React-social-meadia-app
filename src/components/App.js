import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Home, Login, Signup, Settings, UserProfile } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

import React from 'react';

const Page404 = () => {
  return <h1>404</h1>;
};

function PrivateOutlet() {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  const auth = useAuth();
  console.log(auth);
  //if(auth.loading){}
  if (auth.loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={[]} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/settings" element={<PrivateOutlet />}>
          <Route path="" element={<Settings />} />
        </Route>
        <Route path="/user/:userID" element={<PrivateOutlet />}>
          <Route path="" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
