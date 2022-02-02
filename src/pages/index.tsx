import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './styles/home.module.scss';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>🤙 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publications <br/>
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  )
};  

// Criando função server side rendering 
//  (Só pode ser criada em paginas, não em componentes)
//  (O nome da função deve ser sempre o mesmo)
//  (A função deve ser sempre ascincrona "async")

export const getServerSideProps: GetServerSideProps = async () => {

  // Faço a chamada a api do stripe passando o id do preço
  const price = await stripe.prices.retrieve('price_1KOo3RCWaPdJwNCYi7jLoJbs', {
    // Utilizo esse "expand: ['product']" para ter acesso a todas as informações do produto
    expand: ['product']
  });

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  // A pagina tem acesso as props retornadas aqui
  return {
    props: {
      product
    }
  }
} 