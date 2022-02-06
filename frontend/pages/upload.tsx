import { NextPage } from "next";
import React from "react";

import { Container, Layout, UploadPhotoForm } from "../components";

const Upload: NextPage = () => {
  return (
    <Layout>
      <Container>
        <UploadPhotoForm />
      </Container>
    </Layout>
  );
};

export default Upload;
