import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStat, updateUser, userDetail } from "./signupSlice";
import DmfsseContex from "../../appStore/contextStore";
import { FaSpinner } from 'react-icons/fa';


const UserDetail = () => {
  const dispatch = useDispatch();
  const userCtx = useContext(DmfsseContex)
  const user = useSelector(userDetail);
  const token = JSON.parse(localStorage.getItem("user")).accessToken;
  const status = useSelector(updateStat);
  if(status == "succeeded"){
    // userCtx.setShowDetail(false)
  }
  return (
    <div>
      <div class="px-4 sm:px-0">
        <h3 class="text-base font-semibold leading-7 text-gray-900">
          User Information
        </h3>
        <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and information.
        </p>
      </div>
      <div class="mt-6 border-t border-gray-100">
        <dl class="divide-y divide-gray-100">
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.firstName} {user.lastName}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Role</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.roles}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {user.email}
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">Status</dt>
            <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div
                onClick={() => {
                  if (user.verified) {
                    dispatch(
                      updateUser({
                        newData: {
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email,
                          phoneNumber: user.phoneNumber,
                          password: user.password,
                          roles: user.roles,
                          verified: false,
                        },
                        id: user._id,
                        token,
                      })
                    );
                  } else {
                    dispatch(
                      updateUser({
                        newData: {
                          firstName: user.firstName,
                          lastName: user.lastName,
                          email: user.email,
                          phoneNumber: user.phoneNumber,
                          password: user.password,
                          roles: user.roles,
                          verified: true,
                        },
                        id: user._id,
                        token,
                      })
                    );
                  }
                
                }}
                className={`${
                  user.verified ? "bg-red-600" : "bg-green-600"
                }  p-2 flex justify-center rounded-lg cursor-pointer text-white text-center`}
              >
                {status == "loading" ? (
                  <FaSpinner
                  className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  aria-hidden="true"
                />
                ) : null}
                {user.verified ? <span>Block User</span> : <span>Approve</span>}
              </div>
            </dd>
          </div>

          <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt class="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>

            <dd class="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <img
                className="w-full h-96"
                src={user.identifictionPicture}
                alt="sse or farmer document"
              ></img>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UserDetail;
