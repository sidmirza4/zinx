import Head from "next/head";
import { Navbar } from ".";

export const Layout: React.FC = (props) => {
  return (
    <>
      <Head>
        <title>Zinx</title>
        <meta
          name="description"
          content="Ultimate platform to share you talent via art."
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      {props.children}
    </>
  );
};
