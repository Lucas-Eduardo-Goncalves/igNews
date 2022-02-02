import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLogged = true;

  if(isUserLogged) {
    return (
      <button 
        type="button"
        className={styles.SignInButtonContainer}
      >
        <FaGithub color="#84D361"/>
        Lucas Gonçalves
        <FiX color="#737380"/>
      </button>
    ) 
  } else {
    return (
      <button 
        type="button"
        className={styles.SignInButtonContainer}
      >
        <FaGithub color="#EBA417"/>
        Sign in with Github
      </button>
    )
  }
};