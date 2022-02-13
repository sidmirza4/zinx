import type { NextPage } from "next";

import { CardSkeleton, Header, Layout } from "../components";
import AllPhotos from "../components/AllPhotos";
import "react-toastify/dist/ReactToastify.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Header />
      <AllPhotos />
    </Layout>
  );
};

export default Home;
