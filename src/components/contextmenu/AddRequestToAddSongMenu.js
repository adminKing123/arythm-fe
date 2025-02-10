import React, { useState } from "react";
import ReactDOM from "react-dom";
import contextMenuStore from "../../zstore/contextMenuStore";
import Input, { TextArea } from "../Inputs/inputs";
import Button from "../buttons/buttons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAddRequestToAddSong } from "../../api/songrequest/queryHooks";

const Form = ({ setIsAdded }) => {
  const { mutate, isLoading } = useAddRequestToAddSong({
    onSuccess: () => {
      setIsAdded(true);
    },
  });

  const formik = useFormik({
    initialValues: {
      songName: "",
      details: "",
    },
    validationSchema: Yup.object({
      songName: Yup.string()
        .min(2, "Song name must be at least 2 characters")
        .required("Song name is required"),
      details: Yup.string()
        .min(10, "Details must be at least 10 characters")
        .required("Details are required"),
    }),
    onSubmit: (values) => {
      mutate({
        name: values.songName,
        description: values.details,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="text-xl font-semibold text-center">
        Add request to add song
      </h3>
      <div className="mt-6">
        <Input
          name="songName"
          placeholder="Write Song Name"
          value={formik.values.songName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.songName && formik.errors.songName ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.songName}
          </div>
        ) : null}

        <TextArea
          name="details"
          className="max-h-[440px] min-h-[200px] mt-3"
          placeholder="Details/Artists/Album Name/Release Date"
          value={formik.values.details}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.details && formik.errors.details ? (
          <div className="text-red-500 text-xs mt-1">
            {formik.errors.details}
          </div>
        ) : null}

        <div className="text-right mt-3">
          <Button
            type="submit"
            className="min-w-32"
            disabled={!formik.isValid || formik.isSubmitting || isLoading}
          >
            {isLoading ? "Please Wait" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const AddedRequest = ({ setIsAdded }) => {
  const setContextMenuData = contextMenuStore((state) => state.setData);
  return (
    <div>
      <h3 className="text-center text-xl font-semibold">
        Your request added to our database!
      </h3>
      <p className="text-center mt-4">
        Our bots will process your request and will add the requested song
        within 24 hours.
      </p>
      <hr className="my-3 border-[#454545]"></hr>
      <div className="flex justify-between items-center gap-4">
        <Button varient="secondary" onClick={() => setIsAdded(false)}>
          Add another request
        </Button>
        <Button onClick={() => setContextMenuData(null)}>Complete</Button>
      </div>
    </div>
  );
};

const AddRequestToAddSongMenu = () => {
  const [isAdded, setIsAdded] = useState(false);
  const setContextMenuData = contextMenuStore((state) => state.setData);
  return ReactDOM.createPortal(
    <div
      className="bg-[#0000009c] fixed top-0 left-0 z-[60] w-screen h-screen flex justify-center items-center"
      onClick={() => setContextMenuData(null)}
    >
      <div
        className="bg-[#272727] min-w-[240px] max-w-[580px] w-full p-5 rounded-lg mx-10"
        onClick={(e) => e.stopPropagation()}
      >
        {isAdded ? (
          <AddedRequest setIsAdded={setIsAdded} />
        ) : (
          <Form setIsAdded={setIsAdded} />
        )}
      </div>
    </div>,
    document.body
  );
};

export default AddRequestToAddSongMenu;
