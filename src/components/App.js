import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages';
import { Loader, Navbar } from './';

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
      <Home posts={posts} />
    </div>
  );
}

export default App;
