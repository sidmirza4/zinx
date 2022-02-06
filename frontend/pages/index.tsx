import type { NextPage } from "next";
import Head from "next/head";

import { Navbar, Header, Layout } from "../components";
import "react-toastify/dist/ReactToastify.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
    </Layout>
  );
};

export default Home;
