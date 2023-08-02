import React, { useContext, useEffect } from "react";
import GraphDashboard from "./GraphDashboard";
import { useDispatch, useSelector } from "react-redux";
import {
  allOrders,
  getAllOrders,
  orderStatus,
} from "../../features/orders/myOrdersSlice";
import TableLoading from "../tables/TableLoading";
import { EthDateTime } from "ethiopian-calendar-date-converter";
import DmfsseContex from "../../appStore/contextStore";
import { BiChevronLeft, BiChevronRight  } from 'react-icons/bi';

import "../Pagination";


const TableOrders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const orderStat = useSelector(orderStatus);
  const orders = useSelector(allOrders);
  const dispatch = useDispatch();
  const orderCtx = useContext(DmfsseContex)

  useEffect(() => {
    dispatch(getAllOrders({ token }));
  }, [dispatch]);

  return (
    <div className="pt-3 relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between px-3 mb-3">
        <p className="font-bold text-xl">Latest Order</p>
       {/*<div className="cursor-pointer bg-gray-900 px-3 py-1 rounded-md hover:bg-gray-950">
          <p className="text-white">View all orders</p>
        </div>*/} 
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Billing Name
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {orderStat == "loading" ? (
            <TableLoading />
          ) : orderStat == "failed" ? (
            <tr>failed error happen please try again</tr>
          ) : orderStat == "succeeded" ? (
            <>
              {orders.slice(orderCtx.orderpage*10,orderCtx.orderpage*10+10).map((order) => {
                const time = new Date(order.createdAt);
                const date = EthDateTime.fromEuropeanDate(time);
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {`${date}`}
                    </th>
                    <td className="px-6 py-4">{order.product.name}</td>
                    <td className="px-6 py-4">
                      {order.orderBy.firstName} {order.orderBy.lastName}
                    </td>
                    <td className="px-6 py-4">Br.{order.offerPrice}</td>
                    <td className="px-6 py-4">{order.accepted}</td>
                  </tr>
                );
              })}
            </>
          ) : null}
        </tbody>
      </table>
      <div class="flex flex-col items-center">
        <span class="text-sm text-gray-700 dark:text-gray-400">
          <span class="font-semibold text-gray-900 dark:text-white">
            {
              orderCtx.orderpage*10
            }
          </span>{" "}
          to{" "}
          <span class="font-semibold text-gray-900 dark:text-white">
            {orderCtx.orderpage*10 + 10}
          </span>{" "}
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">{orders.length}</span>{" "}
          Entries
        </span>
        <div class="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => {
              if(orderCtx.orderpage >0){
                orderCtx.setOrderPage(orderCtx.orderpage -1)
              }
            }}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <BiChevronLeft
              aria-hidden="true"
              className="w-5 h-5 mr-2"
          />
            Prev
          </button>
          <button
            onClick={() => {
              if(orderCtx.orderpage*10 < orders.length){
                orderCtx.setOrderPage(orderCtx.orderpage + 1)

              }
            }}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 border-0 border-l border-gray-700 rounded-r hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
            <BiChevronRight
            aria-hidden="true"
            className="w-5 h-5 ml-2"
          />
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default TableOrders;
