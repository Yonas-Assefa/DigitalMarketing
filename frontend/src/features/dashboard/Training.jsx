import React, { useContext, useState } from "react";
import Trainings from "../training/Trainings";
import AddTraining from "../training/AddTraining";
import DmfsseContex from "../../appStore/contextStore";
import EditTraining from "../training/EditTraining";
import TrainingDetail from "../training/TrainingDetail";
import { useDispatch, useSelector } from "react-redux";
import { changePage, pagination } from "../training/trainingSlice";
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';


const Training = () => {
  const addCtx = useContext(DmfsseContex);
  const page = useSelector(pagination)
  const dispatch = useDispatch()
  return (
    <div className="p-4 mt-11 sm:ml-64">
      {addCtx.isAdding ? (
        <AddTraining />
      ) : addCtx.isEditing ? (
        <EditTraining />
      ) : addCtx.showDetail ? (
        <TrainingDetail />
      ) : (
        <div className="mb-10">
          <Trainings />

          <div class="flex flex-col items-center">
            <span class="text-sm text-gray-700 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">1</span>{" "}
              to{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                10
              </span>{" "}
              of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                100
              </span>{" "}
              Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
              style={{
                background:'#054112',
             }}
              onClick={()=>{
                if(page >0){
                  dispatch(changePage(page-1))
                }
              }}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <BiChevronLeft
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                />
                Prev
              </button>
              <button
              style={{
                background:'#054112',
             }}
              onClick={()=>{
                dispatch(changePage(page+1))
              }}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
                <BiChevronRight
                  className="w-5 h-5 ml-2"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;
