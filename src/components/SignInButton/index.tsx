import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import { signIn, signOut, useSession } from "next-auth/react";

import styles from './styles.module.scss';

export function SignInButton() {
  const { status, data } = useSession();

  if(status === "authenticated") {
    return (
      <button 
        type="button"
        className={styles.SignInButtonContainer}
        onClick={() => signOut()}
      >
        <FaGithub color="#84D361"/>
        {data.user.name}
        <FiX color="#737380" className={styles.FixSvg}/>
      </button>
    ) 
  } else {
    return (
      <button 
        type="button"
        className={styles.SignInButtonContainer}
        onClick={() => signIn('github')}
      >
        <FaGithub color="#EBA417"/>
        Sign in with Github
      </button>
    )
  }
};