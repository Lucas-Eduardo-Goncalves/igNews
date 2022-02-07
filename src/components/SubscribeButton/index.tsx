import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { status } = useSession();

  async function handleSubscribe() {
    if(status !== 'authenticated') {
      signIn('github');
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({
        sessionId: sessionId
      });

    } catch(err) {
      alert(err);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className={styles.subscribeButtonContainer}
    >
      Subscribe now
    </button>
  )
}