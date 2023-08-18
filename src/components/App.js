import { Route, Routes } from 'react-router-dom';
import { Home, Login, Signup } from '../pages';
import { Loader, Navbar } from './';
import { useAuth } from '../hooks';

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const auth = useAuth();
  console.log(auth.user);
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
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
