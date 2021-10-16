import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ currentNumber }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apollo Reactive Variables Issue</title>
        <meta name="description" content="Apollo Reactive Variables Issue" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Current value <a href="#">{currentNumber}</a>
        </h1>
      </main>
    </div>
  )
}

export default Home
