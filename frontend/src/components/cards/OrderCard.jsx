import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { offerStatus } from "../../features/orders/myOrdersSlice";
import { FiLoader, FiCircle } from 'react-icons/fi';

const OrderCard = ({
  product,
  quantity,
  price,
  status,
  onAccept,
  onReject,
  onCheckout,
  onDetail,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const offerStat = useSelector(offerStatus);
  return (
    <div
      class={`relative flex w-full  flex-col overflow-hidden rounded-lg border ${
        status == "rejected" ? "border-red-700" : "border-gray-100"
      }    bg-white shadow-md`}
    >
      <a
        class="relative cursor-pointer mx-3 mt-3 flex h-44 overflow-hidden rounded-xl"
        onClick={onDetail}
      >
        <img class="w-full" src={product.photo} alt="product image" />
      </a>
      <div class="mt-4 px-5 pb-5">
        <a className="flex justify-between">
          <h5 class="text-xl tracking-tight text-slate-900">{product.name}</h5>
          <h5 className="text-2xl font-bold text-slate-900">{quantity}KG</h5>
        </a>
        <div class="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span class="text-2xl font-bold text-slate-900">
              {price}.ETB/KG
            </span>
            {/* <span class="text-sm text-slate-900 line-through">699.ETB</span> */}
          </p>
          <div
            className={`text-lg font-bold ${
              status == "rejected" ? "text-red-700" : "text-slate-900"
            }  animate-bounce`}
          >
            {status.toUpperCase()}...
          </div>
        </div>
        {status == "accepted" && product.postedBy != user.id ? (
          <div
            onClick={onCheckout}
            className="text-xl flex justify-center items-center font-bold bg-slate-900 p-2 rounded-sm cursor-pointer text-white"
          >
            Check Out
          </div>
        ) : null}
        {status == "rejected" && product.postedBy != user.id ? (
          <span
            onClick={() => console.log("jjjjjjjjjkkkkkkkkk")}
            class="z-30 cursor-pointer p-1 absolute top-2 left-2 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"
          >
            delete
          </span>
        ) : null}
        {status == "completed" ? (
          <div className="flex justify-center items-center text-green-400 animate-pulse">
            <span class="material-symbols-outlined">done</span> 
            <span>Payment Successfully Done</span>
          </div>
        ) : null}
        {(product.postedBy == user.id && status != "completed") ? (
          <div className="flex justify-between">
            <div
              onClick={onAccept}
              className="text-md flex hover:underline justify-center items-center  p-2 rounded-md cursor-pointer text-green-600"
            >
              Accept
            </div>{" "}
            <div
              onClick={onReject}
              className="text-md flex hover:underline justify-center items-center   p-2 rounded-md cursor-pointer text-red-600"
            >
              Reject
            </div>
          </div>
        ) : null}
      </div>
      {offerStat == "loading" ? (
        <div className="absolute h-full w-full bg-gray-300 bg-opacity-50 z-10 top-0 flex justify-center items-center">
            <FiLoader
            className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
            />
          <FiCircle
            className="inline w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-green-500"
            viewBox="0 0 100 101"
            fill="none"
          />
        </div>
      ) : null}
    </div>
  );
};

export default OrderCard;
