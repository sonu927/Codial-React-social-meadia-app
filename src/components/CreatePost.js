import { useState } from 'react';
import { addPost } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../styles/home.module.css';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePosts();

  const handleAddPostClick = async () => {
    setAddingPost(true);

    const response = await addPost(post);
    if (response.success) {
      setPost('');
      posts.addPostsToState(response.data.post);
      toast.success('Post Added Successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
        disabled={addingPost}
      />

      <div>
        <button className={styles.addPostBtn} onClick={handleAddPostClick}>
          {addingPost ? 'Adding Post....' : 'Add Post'}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatePost;
