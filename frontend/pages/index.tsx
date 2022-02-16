import type { NextPage } from "next";
import "react-toastify/dist/ReactToastify.css";

import AllPhotos from "../components/AllPhotos";
import { Header, Layout } from "../components";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <AllPhotos />
    </Layout>
  );
};

export default Home;
