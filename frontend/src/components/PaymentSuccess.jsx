import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateOrder } from "../features/orders/myOrdersSlice";
import { updateProduct } from "../features/product/productSlice";
import { MdCheckCircle } from 'react-icons/md';

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.accessToken;
  const order = JSON.parse(localStorage.getItem("order"));

  useEffect(() => {
    dispatch(
      updateOrder({
        newData: { accepted: "completed" },
        id: order._id,
        token,
      })
    );
    const originalAmount = order.product.amount;
    const soldAmount = order.quantity;
    const availableAmount = originalAmount - soldAmount;
    if (availableAmount == 0) {
      dispatch(
        updateProduct({
          newData: { amount: availableAmount, soldout: true },
          id: order.product._id,
          token,
        })
      );
    } else {
      dispatch(
        updateProduct({
          newData: { amount: availableAmount },
          id: order.product._id,
          token,
        })
      );
    }
  }, []);

  return (
    <div className="bg-gray-100 h-screen p-32">
      <div className="bg-white p-6  md:mx-auto">

        <MdCheckCircle className="text-green-600 w-16 h-16 mx-auto my-6" />;

        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p> Have a great day! </p>
          <div className="py-10 text-center">
            <a
              onClick={() => {
                window.close();
              }}
              className="px-12 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3"
            >
              GO BACK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
