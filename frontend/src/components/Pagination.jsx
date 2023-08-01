import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage, pagination } from '../features/training/trainingSlice'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoArrowForward } from 'react-icons/io5';

const Pagination = () => {
    const page = useSelector(pagination)
    const dispatch = useDispatch()
  return (
    <div class="flex flex-col items-center">
    <span class="text-sm text-gray-700 dark:text-gray-400">
      <span class="font-semibold text-gray-900 dark:text-white">{page*10+1}</span>{" "}
      to{" "}
      <span class="font-semibold text-gray-900 dark:text-white">
        {page*10 + 10}
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
        hover: 'light-green'
     }}
      onClick={()=>{
        if(page >0){
          dispatch(changePage(page-1))
        }
      }}
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        <AiOutlineArrowLeft className="w-5 h-5 mr-2" />
        Prev
      </button>
      <button
      style={{
        background:'#054112',
     }}
      onClick={()=>{
        dispatch(changePage(page+1))
      }}
      class="inline-flex items-center px-4 py-2 text-sm font-medium text-white border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
        Next
        <IoArrowForward className="w-5 h-5 ml-2" />
      </button>
    </div>
  </div>
  )
}

export default Pagination