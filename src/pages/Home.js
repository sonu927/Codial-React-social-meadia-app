import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { CreatePost, FriendsList, Post } from '../components';
import { Loader } from '../components';
import styles from '../styles/home.module.css';

import { useAuth, usePosts } from '../hooks';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return <Post post={post} key={`post-${post._id}`} />;
        })}
      </div>
      {auth.user && <FriendsList />}
      <ToastContainer />
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
