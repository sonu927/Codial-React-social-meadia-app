import { useNavigate, useParams } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { addFriend, fetchUser, removeFriend } from '../api';
import { Loader } from '../components';
import { useAuth } from '../hooks';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgess, setRequestInProgress] = useState(false);
  const { userID } = useParams();
  const navigate = useNavigate();
  const auth = useAuth();

  console.log('userId: ', userID);
  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUser(userID);
      console.log('user profile response : ', response);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('Could not find the user', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        return navigate('/');
      }
      setLoading(false);
    };
    getUser();
  }, [userID, navigate]);

  const checkIfUserIsAFriend = () => {
    const friends = auth.user.friends;
    if (!friends) {
      return false;
    }

    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userID);

    if (index !== -1) {
      return true;
    }

    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(userID);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user._id === userID
      );

      auth.updateUserFriends(false, friendship[0]);
      toast.success('Friend Removed SuccessFully!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    setRequestInProgress(false);
  };
  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(userID);

    if (response.success) {
      const { friendship } = response.data;

      auth.updateUserFriends(true, friendship);
      toast.success('Friend Added SuccessFully!!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    setRequestInProgress(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4140/4140048.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
            disabled={requestInProgess}
          >
            {requestInProgess ? 'Removing...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgess}
          >
            {requestInProgess ? 'Adding...' : 'Add friend'}
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserProfile;
