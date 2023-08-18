import PropTypes from 'prop-types';
import { Comment } from '../components';
import { useState, useEffect } from 'react';
import { getPosts } from '../api';
import { Loader } from '../components';
import styles from '../styles/home.module.css';

const Home = () => {
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
    <div className={styles.postsList}>
      {posts.map((post) => {
        return (
          <div className={styles.postWrapper} key={`post-${post._id}`}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                  alt="user-pic"
                />
                <div>
                  <span className={styles.postAuthor}>{post.user.name}</span>
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

                {/* <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>

                  <div className={styles.postCommentContent}>
                    Random comment
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
