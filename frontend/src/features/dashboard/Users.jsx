import React, { useContext } from "react";
import AddItem from "../../components/AddItem";
import ItemTable from "../../components/tables/UserTable";
import AddUser from "../signup/AddUser";
import DmfsseContex from "../../appStore/contextStore";
import EditUser from "../signup/EditUser";
import UserDetail from "../signup/UserDetail";
import { BiChevronLeft, BiChevronRight  } from 'react-icons/bi';

const Users = () => {
  const addCtx = useContext(DmfsseContex);
  return (
    <div className="p-4 mt-11 sm:ml-64">
      {addCtx.isAdding ? (
        <AddUser />
      ) : addCtx.isEditing ? (
        <EditUser />
      ) : addCtx.showDetail ? (
        <UserDetail />
      ) : (
        <div>
          <AddItem />
          <ItemTable
            prop1={"Name"}
            prop2={"State"}
            prop3={"Role"}
            prop4={"Creation Date	"}
          />
            <div class="flex flex-col items-center">
            <span class="text-sm text-gray-700 dark:text-gray-400">
              <span class="font-semibold text-gray-900 dark:text-white">{addCtx.userpage*10}</span>{" "}
              to{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                {addCtx.userpage*10 + 10}
              </span>{" "}
              of{" "}
              <span class="font-semibold text-gray-900 dark:text-white">
                100
              </span>{" "}
              Entries
            </span>
            <div class="inline-flex mt-2 xs:mt-0">
              <button
              onClick={()=>{
                if(addCtx.userpage >0){
                  addCtx.setUserPage(addCtx.userpage -1)
                  
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
              onClick={()=>{
                addCtx.setUserPage(addCtx.userpage + 1)
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

export default Users;
