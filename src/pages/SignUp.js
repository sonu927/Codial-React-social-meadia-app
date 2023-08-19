import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '../hooks';
import styles from '../styles/login.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate('/');
    }
  }, [auth.user, navigate]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill all the fields!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      error = true;
    }

    if (password !== confirmPassword) {
      toast.error('Make sure password and confirm password matches!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      setSigningUp(false);

      toast.success('User registered successfully, please login now', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      navigate('/login');
      return;
    } else {
      toast.error(response.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }

    setSigningUp(false);
  };

  return (
    <>
      <form className={styles.loginForm} onSubmit={handleFormSubmit}>
        <span className={styles.loginSignupHeader}> Signup</span>
        <div className={styles.field}>
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Confirm password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <button disabled={signingUp}>
            {signingUp ? 'Signing up...' : 'Signup'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default Signup;
