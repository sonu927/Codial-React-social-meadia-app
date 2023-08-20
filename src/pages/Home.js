import PropTypes from 'prop-types';
import { Comment, CreatePost, FriendsList } from '../components';
import { Loader } from '../components';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useAuth, usePosts } from '../hooks';

const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  function getTimeDifferenceString(timestamp) {
    const currentTime = new Date();
    const createdAt = new Date(timestamp);

    const timeDifference = currentTime - createdAt;
    const seconds = Math.floor(timeDifference / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    }
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => {
          return (
            <div className={styles.postWrapper} key={`post-${post._id}`}>
              <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                    alt="user-pic"
                  />
                  <div>
                    {/* {console.log('post.user :', post.user)} */}
                    <Link
                      to={`/user/${post.user._id}`}
                      state={{
                        user: post.user,
                        // userEmail: post.user.email,
                      }}
                      className={styles.postAuthor}
                    >
                      {post.user.name}
                    </Link>
                    <span className={styles.postTime}>
                      {getTimeDifferenceString(post.createdAt)}
                    </span>
                  </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                  <div className={styles.postLike}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/1062/1062675.png"
                      alt="likes-icon"
                    />
                    <span>{post.likes.length}</span>
                  </div>

                  <div className={styles.postCommentsIcon}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/13/13673.png"
                      alt="comments-icon"
                    />
                    <span>2</span>
                  </div>
                </div>
                <div className={styles.postCommentBox}>
                  <input placeholder="Start typing a comment" />
                </div>

                <div className={styles.postCommentsList}>
                  <Comment comments={post.comments} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
