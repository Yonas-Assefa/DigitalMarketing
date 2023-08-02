import React, { useContext, useState } from "react";
import UploadImage from "../../components/UploadImage";
import DmfsseContex from "../../appStore/contextStore";
import { useDispatch } from "react-redux";
import { addNewTraining } from "./trainingSlice";
import { BiLoaderAlt } from 'react-icons/bi';


const AddTraining = () => {
  const addCtx = useContext(DmfsseContex);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestStatus, setRequestStatus] = useState("idle");

  const trainingInfo = {
    title: title,
    description: description,
    mediaFile: addCtx.imageUrl,
  };

  const canSave = [title, description, token].every(Boolean);
  const handleAddTraining = async (e) => {
    e.preventDefault();
    setRequestStatus("idle");
    if (canSave) {
      try {
        setRequestStatus("pending");
        const response = await dispatch(
          addNewTraining({ initalData: trainingInfo, token })
        ).unwrap();
        if (response == "ERR_BAD_REQUEST") {
          setRequestStatus("bad_err");
        }
        if (response == "ERR_NETWORK") {
          setRequestStatus("net_err");
        }
        if (response.title && response.description) {
          setTitle("");
          setDescription("");
          addCtx.setImageUrl("");
          addCtx.setProgressPercent(0);
          addCtx.setFile(null);
          setRequestStatus("idle");
          addCtx.setIsAdding(false);
        }
      } catch (err) {
        setRequestStatus("failed");
      }
    }
  };
  return (
    <div className="w-full px-8 py-8 flex flex-col rounded-x text-gray-700 shadow-none">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Training
          </h4>
          {requestStatus == "net_err" ? (
            <p className="text-red-600 mb-4 italic animate-bounce">
              Pleace check your connection
            </p>
          ) : requestStatus == "bad_err" ? (
            <p className="text-red-600 mb-4 italic animate-bounce">
              You are not allowed to add training
            </p>
          ) : requestStatus == "faild" ? (
            <p className="mb-4 animate-bounce">error happen please try again</p>
          ) : (
            <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Enter Training Details
            </p>
          )}
        </div>
        <div
          onClick={() => addCtx.setIsAdding(false)}
          className="flex cursor-pointer px-5 py-1 rounded-lg self-center items-center"
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
          <p className="text-lg">Back</p>
        </div>
      </div>
      <form
        onSubmit={handleAddTraining}
        className="mt-8 mb-2 max-w-screen-lg w-full"
      >
        <div className="mb-4 flex flex-col gap-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeHolder=" "
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Title
            </label>
          </div>

          <div class="">
            <div class="relative w-full min-w-[200px]">
              <textarea
                class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Description
              </label>
            </div>
          </div>
        </div>
        <UploadImage />
        <button
        style={{
          background:'#054112',
        hover:'#3DA12E'}}
          className="flex mt-6 h-12 justify-center w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="submit"
          data-ripple-light="true"
        >
          {requestStatus == "pending" ? (
            <div>
              <BiLoaderAlt
                className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                aria-hidden="true"
              />
              <span className="sr-only">Loading...</span>
            </div>
          ) : null}
          <p>Add Training</p>
        </button>
      </form>
    </div>
  );
};

export default AddTraining;
