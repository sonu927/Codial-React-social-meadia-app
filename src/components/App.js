import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getPosts } from '../api';
import { Home, Login } from '../pages';
import { Loader, Navbar } from './';

const Page404 = () => {
  return <h1>404</h1>;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fecthPost = async () => {
      const response = await getPosts();
      console.log(response);
      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fecthPost();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
