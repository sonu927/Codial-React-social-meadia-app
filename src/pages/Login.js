import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import styles from '../styles/login.module.css';
import { useAuth } from '../hooks';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const auth = useAuth();
  console.log(auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);

    if (!email || !password) {
      toast.error('Please fill all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    const response = await auth.login(email, password);

    if (response.success) {
      toast('Logged In Successfully', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate('/');
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    setLoggingIn(false);
  };
  return (
    <>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>

        <div className={styles.field}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <input
            type="password"
            placeholder="Paasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <button disabled={loggingIn}>
            {loggingIn ? 'Logging In...' : 'Log In'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
