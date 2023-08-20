import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Comment } from '../components';

import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { usePosts } from '../hooks';
import { useState } from 'react';
import { addComment, toggleLike } from '../api';

const Post = ({ post }) => {
  const posts = usePosts();
  const [comment, setComment] = useState('');

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

  const handleCommentEnter = async (post) => {
    const response = await addComment(post._id, comment);

    if (response.success) {
      setComment('');
      posts.addCommentToState(post._id, response.data.comment);
      toast.success('Comment added successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, 'Post');

    if (response.success) {
      if (response.data.deleted) {
        toast.success('Post Like Removed successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else {
        toast.success('Post Liked successfully', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
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
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1062/1062675.png"
                alt="likes-icon"
              />
            </button>

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
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommentEnter(post);
              }
            }}
            placeholder="Start typing a comment"
          />
        </div>

        <div className={styles.postCommentsList}>
          <Comment comments={post.comments} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Post;
