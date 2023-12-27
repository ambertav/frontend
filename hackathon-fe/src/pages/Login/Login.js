import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as usersService from '../../utilities/users-service';

import Header from '../../components/Header/Header';

import mobileLogin from '../../assets/images/login/mobileLogin.png';
import desktopLogin from '../../assets/images/login/desktopLogin.png';

import { BsArrowLeft } from 'react-icons/bs';

import styles from '../../styles/Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const handleFormMessage = (string) => {
    setIsSubmitting(false);

    // handles scrolling to top to display message with various reasons for why form is not valid for submit
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return setValidationMessage(string);
  };

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  }

  function validateForm() {
    if (!credentials.email || !credentials.password) return false;
    else return true;
  }

  async function handleLogin(evt) {
    evt.preventDefault();
    setIsSubmitting(true);

    // resets message
    setValidationMessage('');

    const valid = validateForm();
    if (!valid) return handleFormMessage('Required fields are marked with (*)');
    try {
      const user = await usersService.login(credentials);
      if (user) navigate('/friends');
      else return handleFormMessage('Login failed, try again');
    } catch {
      return handleFormMessage('Login failed, try again');
    }
  }

  return (
    <>
      <Header />
      <section className={styles['login-container']}>
        <div className={styles['content-container']}>
          <div className={styles['back-button']}>
            <Link to="/">
              <BsArrowLeft />
            </Link>
          </div>
          <h1>Log In</h1>

          <br />

          <img
            src={mobileLogin}
            alt="Birthday cake"
            className={styles['mobile-login']}
          />
          <img
            src={desktopLogin}
            alt="Girl with present"
            className={styles['desktop-login']}
          />

          <p>{validationMessage ? validationMessage : ''}</p>
          <form className={styles['form-container']} onSubmit={handleLogin}>
            <div className={styles['form-group']}>
              <label htmlFor="email" style={{ paddingTop: 10 }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <br />
            <div className={styles['form-group']}>
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                name="password"
                id="password"
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles['form-group']}>
              <p className={styles['forgot-password']} onClick={() => navigate('/reset-password')}>Forgot Password?</p>
            </div>
            <button
              className={styles['login-button']}
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
