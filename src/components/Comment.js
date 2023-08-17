import styles from '../styles/home.module.css';

const Comment = ({ comments }) => {
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

  return comments.map((comment) => {
    return (
      <div className={styles.postCommentsItem} key={`comment-${comment._id}`}>
        <div className={styles.postCommentHeader}>
          <span className={styles.postCommentAuthor}>{comment.user.name}</span>
          <span className={styles.postCommentTime}>
            {getTimeDifferenceString(comment.createdAt)}
          </span>
          <span className={styles.postCommentLikes}>
            {comment.likes.length}
          </span>
        </div>

        <div className={styles.postCommentContent}>{comment.content}</div>
      </div>
    );
  });
};

export default Comment;
