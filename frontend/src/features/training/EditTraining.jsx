import React, { useContext, useEffect, useState } from "react";
import DmfsseContex from "../../appStore/contextStore";
import UploadImage from "../../components/UploadImage";
import { useDispatch, useSelector } from "react-redux";
import { addDetailData, trainingDetail, updateTraining } from "./trainingSlice";

const EditTraining = () => {
  const dispatch = useDispatch();
  const detailTraining = useSelector(trainingDetail)

  const editCtx = useContext(DmfsseContex);

  const [title, setTitle] = useState(editCtx.detailData.title);
  const [description, setDescription] = useState(
    editCtx.detailData.description
  );
  
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;

  useEffect(() => {
    editCtx.setImageUrl(editCtx.detailData.mediaFile);
  }, [dispatch]);
  const newData = { title, description, mediaFile: editCtx.imageUrl };
  const newInfo = { newData, id: detailTraining._id, token };
 
  const handleEdit = () => {
    // localStorage.setItem("training", JSON.stringify( newData))
    dispatch(updateTraining(newInfo));
    editCtx.setIsEditing(false);
  };
  return (
    <div className="w-full px-8 py-8 flex flex-col rounded-x text-gray-700 shadow-none">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Training
          </h4>
          <p className="mt-1 block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            Enter Training Details
          </p>
        </div>
        <div
          onClick={() => editCtx.setIsEditing(false)}
          className="flex cursor-pointer px-5 py-1 rounded-lg self-center items-center"
        >
          <span class="material-symbols-outlined">arrow_back_ios</span>{" "}
          <p className="text-lg">Back</p>
        </div>
      </div>
      <form className="mt-8 mb-2 max-w-screen-lg w-full">
        <div className="mb-4 flex flex-col gap-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeHolder=" "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Title
            </label>
          </div>

          <div class="">
            <div class="relative w-full min-w-[200px]">
              <textarea
                class="peer h-48 min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-green-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-green-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Description
              </label>
            </div>
          </div>
        </div>
        <div className="my-5">
          <img
            src={editCtx.imageUrl}
            alt="training media file will displayed here"
          ></img>
        </div>
        <UploadImage />
        <button
        style={{
          background:'#054112',
        hover:'#3DA12E'}}
          onClick={() => {
            handleEdit();
          }}
          className="mt-6 block w-full select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          Save Training
        </button>
      </form>
    </div>
  );
};

export default EditTraining;
