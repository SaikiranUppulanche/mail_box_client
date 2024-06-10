import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { mailHandler } from "../store/mailActions";
// import parse from "html-react-parser";

const ComposeMail = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [editorError, setEditorError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const plainContent = editorRef.current?.editor?.getText().trim();
    if (plainContent === "") {
      setEditorError("Enter valid message");
      return;
    }
    setEditorError("");
    const mailObj = {
      ...data,
      content,
    };
    dispatch(mailHandler(mailObj));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col px-10">
      <label className=" text-gray-500 border-b-2 pb-2">
        To
        <input
          type="email"
          {...register("email", {
            required: "Required*",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Enter a valid email address",
            },
          })}
          className="w-[90%] !outline-none ms-4 text-black"
        />
        Cc/Bcc
      </label>
      {errors.email?.message && (
        <p className="text-red-600">{errors.email.message}</p>
      )}
      <label className=" text-gray-500 border-b-2 ">
        Subject
        {/* <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="!outline-none py-3 ms-4"
        /> */}
        <input
          type="text"
          {...register("subject", {
            required: "Required*",
          })}
          className="w-[90%] !outline-none py-3 ms-4 text-black"
        />
      </label>
      {errors.subject?.message && (
        <p className=" text-red-600">{errors.subject.message}</p>
      )}
      {/* <textarea
        // cols="30"
        rows="20"
        className="!outline-none border-b-2 resize-none py-3 mb-3"
      ></textarea> */}
      <ReactQuill
        className="h-[50vh] mt-8"
        theme="snow"
        ref={editorRef}
        value={content}
        onChange={setContent}
      />
      {editorError && <p className="text-red-600 mt-10">{editorError}</p>}

      <div className="flex flex-row mt-14 ">
        <button
          type="submit"
          className="bg-blue-500 text-white px-10 py-2 rounded-sm "
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ComposeMail;
