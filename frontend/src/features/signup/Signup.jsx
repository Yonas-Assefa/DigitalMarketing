import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import AuthRight from "../../components/AuthRight";
import { useNavigate } from "react-router-dom";
import UploadImage from "../../components/UploadImage";
import DmfsseContex from "../../appStore/contextStore";
import { useDispatch } from "react-redux";
import { addNewUser } from "./signupSlice";
import logoimg from '../../assets/images/flogo22.png';
import { AiOutlineLoading } from 'react-icons/ai';



const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dmfsseCtx = useContext(DmfsseContex);

  //request status
  //idle | loading | succeeded | failed

  const [requestStatus, setRequestStatus] = useState("idle");

  // user information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const logo = logoimg;
  const userInfo = {
    firstName,
    lastName,
    email,
    roles:[role],
    phoneNumber,
    password,
    identifictionPicture: dmfsseCtx.imageUrl,
  };
  // get user info from failed
  const getFirstName = (e) => setFirstName(e.target.value);
  const getLastName = (e) => setLastName(e.target.value);
  const getEmail = (e) => setEmail(e.target.value);
  const getPhoneNumber = (e) => {
    setRequestStatus("idle");
    setPhoneNumber(e.target.value);

  };
  const getPassword = (e) => setPassword(e.target.value);

  // can save
  const canSave =
    [firstName, lastName, role, phoneNumber, password].every(Boolean)
  // handle change role
  const handleRoleChange = (e) => {
    if (e.target.value === "farmer" || e.target.value === "sse") {
      dmfsseCtx.setIsFarmerOrSse(true);
    } else {
      dmfsseCtx.setIsFarmerOrSse(false);
    }
    setRole(e.target.value)
  };

  // handle register
  const handleSubmit = async (e) => {
    

    e.preventDefault();
    setRequestStatus("idle");
    
    if (canSave) {
      try {
        setRequestStatus("pending");
        const response = await dispatch(addNewUser(userInfo)).unwrap();
        
        if (response == "ERR_BAD_REQUEST") {
          setRequestStatus("bad_err");
        }
        if (response == "ERR_NETWORK") {
          setRequestStatus("net_err");
        }
        if (response.message) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setRole("customer");
          setPhoneNumber("");
          setPassword("");
          setRequestStatus("idle");
          navigate("/login");
        }
      } catch (err) {
        setRequestStatus("failed");
      }
    }
  };

  return (
    <section className="gradient-form h-100 bg-neutral-200 flex justify-center">
      <div className="container h-full pt-0">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800">
          <div className="w-full">
            <div style={{height:'665px'}} className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* Left column container */}
                <div style={{height:'665px'}} className="px-4 md:px-0 lg:w-6/12">
                  <div className="pt-0 md:mx-6 md:p-1">
                    {/* Logo */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-58"
                        src={logo}
                        alt="logo"
                      />
                    
                    </div>

                    <form onSubmit={handleSubmit}>
                      {requestStatus == "net_err" ? (
                        <p className="text-red-600 mb-2 italic animate-bounce">
                          Pleace check your connection
                        </p>
                      ) : requestStatus == "bad_err" ? (
                        <p className="text-red-600 mb-2 italic animate-bounce">
                          phone number already exist
                        </p>
                      ) : requestStatus == "faild" ? (
                        <p className="mb-4 animate-bounce">error happen please try again</p>
                      ) : (
                        <p className="mb-4	animate-bounce animate-pulse">Please create to your account</p>
                      )}
                      {/* Phone number input */}
                      
                      <div className="sm:flex gap-4">
                        <div className="relative z-0 w-full group">
                          <label
                            htmlFor="firstName"
                            className="uppercase  text-[11px]  text-gray-900 bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-rose-400"
                          >
                           Name *
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            onChange={getFirstName}
                            value={firstName}
                            className={`h-9 text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 focus:border-transparent focus:ring-0 focus:border-gray-400`}
                            required={true}
                            placeholder="Enter Your Name"
                          />
                        </div>
                        <div className="relative z-0 w-full group">
                          <label
                            htmlFor="lastName"
                            className="uppercase  text-[11px]  text-gray-900 bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-rose-400"
                          >
                            Father's Name *
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            onChange={getLastName}
                            value={lastName}
                            className="h-9 text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 focus:border-transparent focus:ring-0 focus:border-gray-400"
                            required={true}
                            placeholder="Enter Father's Name"
                          />
                        </div>
                      </div>

                      <div className="sm:flex gap-4">
                        <div className="relative z-0 w-full group">
                          <label
                            htmlFor="email"
                            className="uppercase  text-[11px]  text-gray-900 bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-rose-400"
                          >
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={getEmail}
                            value={email}
                            className="h-9 text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 focus:border-transparent focus:ring-0 focus:border-gray-400"
                            required={true}
                            placeholder="contact@gmail.com"
                          />
                        </div>
                        <div className="relative z-0 w-full group">
                          <label
                            htmlFor="email"
                            className="uppercase  text-[11px]  text-gray-900 bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-rose-400"
                          >
                            Role
                          </label>
                          <select
                            onChange={handleRoleChange}
                            className="h-9 text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2 focus:border-transparent focus:ring-0 focus:border-gray-400"
                          >
                            <option value={"customer"}>Customer</option>
                            <option value={"farmer"}>Farmer</option>
                            <option value={"sse"}>SSE</option>
                          </select>
                        </div>
                      </div>
                      <div className="sm:flex gap-4">
                        <div className="relative z-0 w-full group">
                          <label
                            htmlFor="phoneNumber"
                            className="uppercase  text-[11px]  text-gray-900 bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-rose-400"
                          >
                            Phone Number *
                          </label>
                          
                          <input
                            type="tel"
                            name="phoneNumber"
                            pattern="[0]{1}[0-9]{9}"
                            id="phoneNumber"
                            onChange={getPhoneNumber}
                            value={phoneNumber}
                            className="h-9 text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 focus:border-transparent focus:ring-0 focus:border-gray-400"
                            required={true}
                            placeholder="+251953890542"
                          />
                        </div>

                        {/* Password input */}
                        <div className="relative z-0 w-full group">
                          <label
                            htmlFor="password"
                            className="uppercase  text-[11px]  text-gray-900 bg-white relative px-1  top-2 left-3 w-auto group-focus-within:text-rose-400"
                          >
                            Password *
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={getPassword}
                            value={password}
                            className="h-9 text-10 bg-gray-50 border py-55-rem border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 focus:border-transparent focus:ring-0 focus:border-gray-400"
                            required={true}
                            placeholder="********"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          />
                        </div>
                      </div>
                      {dmfsseCtx.isFarmerOrSse ? <UploadImage /> : null}

                      {/* Submit button */}
                      <button 
                      style={{
                        background:'#054112',
                     }}
                        type="submit"
                        className="flex justify-center mb-3 mt-3 py-2 hover:bg-green-900 text-center w-full rounded-lg"
                      >
                        {requestStatus == "pending" ? (
                          <div>
                             <AiOutlineLoading
                              className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : null}
                        <p className="text-white font-bold self-center">Register</p>
                      </button>

                      {/* Register button */}
                      <div className="flex items-center justify-between pb-2 pt-2">
                        <div>
                        <p className="mb-0 mr-2">Already have an account?</p>
                        <button 
                        style={{
                          background:'#054112',
                          color: 'white'
                       }}
                          onClick={() => {
                            navigate("/login");
                          }}
                          type="button"
                          className="inline-block rounded-lg border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                        >
                          Log in
                        </button>
                        </div>
                        <div onClick={()=>{navigate("/")}} className="underline cursor-pointer text-green-950">Home</div>
                    
                      </div>
                    </form>
                  </div>
                </div>

                {/* Right column container with background and description */}
                <AuthRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
