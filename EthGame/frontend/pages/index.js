import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Eth Game</title>
        <meta name="description" content="An Ethereum Game Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.h1}>Eth Game 😎</h1>
      </main>

      <footer className={styles.footer}>Made by Bram Mathijssen </footer>
    </div>
  );
}
