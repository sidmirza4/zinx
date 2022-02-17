import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { Input, Button } from ".";
import ipfs from "../ipfs";
import { useAppContext } from "../context/AppContext";

const FILE_SIZE = 10485760;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object({
  name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Please fill you name"),
  description: Yup.string().max(100, "Must be 100 characters or less"),
  image: Yup.mixed()
    .test(
      "fileSize",
      "File Size is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileType",
      "Unsupported File Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});

interface IFormValues {
  name: string;
  description: string;
  image: File | Blob | null;
}

const initialValues: IFormValues = {
  name: "",
  description: "",
  image: null,
};

export const UploadPhotoForm = () => {
  const { selectedAccount } = useAppContext();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { zinx } = useAppContext();

  const [file, setFile] = useState<string | null>(null);

  const onSubmit = async (values: IFormValues) => {
    if (!selectedAccount) {
      toast.error(
        <p className="dark:text-darkBlue">Please connect your wallet first!</p>
      );

      return;
    }

    setLoading(true);

    let imageBuffer: Uint8Array;
    // reading image as buffer
    const reader = new FileReader();
    reader.readAsArrayBuffer(values.image!);
    reader.onloadend = async () => {
      imageBuffer = Buffer.from(reader.result as string);

      // upload the file
      const [content] = await ipfs.files.add(imageBuffer);

      console.log(content);

      if (!content || !content.hash) {
        toast.error(<p className="dark:bg-darkBlue">Somthing went wrong</p>);
        setLoading(false);
        return;
      }

      // upload photo on contract
      try {
        await zinx?.uploadPhoto(content.hash, values.name, values.description);
        setTimeout(() => {
          setLoading(false);
          toast.success(
            <p className="dark:text-darkBlue">Photo uploaded successfully</p>
          );
          router.replace("/");
        }, 25000);
      } catch (error: any) {
        console.log(error);
        if (error.code === 4001) {
          toast.error(
            <p className="dark:text-darkBlue">You declined the request!</p>
          );
        } else {
          toast.error(
            <p className="dark:text-darkBlue">Something went wrong!</p>
          );
        }
        setLoading(false);
      }
    };
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="flex flex-col mt-4">
          <div className="mb-6">
            <Input
              disabled={loading}
              name="name"
              placeholder="Enter your name"
              label="Full Name*"
            />
          </div>

          <div className="mb-6">
            <Input
              disabled={loading}
              name="description"
              placeholder="Write a short description"
              label="Description"
            />
          </div>

          {/* UPLOAD PHOTO FIELD */}
          <div className="mb-6">
            <label className="block font-medium text-darkBlue">Image*</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex justify-center text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-medium underline"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={(e) => {
                        let reader = new FileReader();
                        if (e.currentTarget && e.currentTarget.files) {
                          let uploadedFile = e.currentTarget.files[0];
                          if (uploadedFile) {
                            setFieldValue("image", uploadedFile);
                            reader.readAsDataURL(uploadedFile);
                          }
                          reader.onloadend = () => {
                            setFile(reader.result as string);
                          };
                        }
                      }}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          {/* FILE PREVIEW */}
          {file && (
            <motion.div className="mb-6">
              <img src={file} alt="uploaded image" />
            </motion.div>
          )}
          {loading ? (
            <div className="flex items-center justify-center ">
              <div className="w-16 h-16 border-b-2 dark:border-white border-darkBlue rounded-full animate-spin"></div>
            </div>
          ) : (
            <Button disabled={loading} type="submit">
              Upload
            </Button>
          )}
        </Form>
      )}
    </Formik>
  );
};
