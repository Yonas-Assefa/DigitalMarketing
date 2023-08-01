import React from "react";
import { useNavigate } from "react-router-dom";

const SSEFarmerMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex mr-5">
      <div
        onClick={() => navigate("/messages")}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full"
      >
        <p className="font-thin">Messages</p>
        <span className="bg-blue-200 font-thin text-green-800 p-1 rounded-full w-5 h-5 items-center flex justify-center">
          3
        </span>
      </div>
      <div
        onClick={() => navigate("/myproducts")}
        className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full"
      >
        <p className="font-thin">My Items</p>
      </div>
      <div
        onClick={() => navigate("/myorders")}
        className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full"
      >
        <p className="font-thin">Orders</p>
      </div>
      <div
        onClick={() => navigate("/myoffers")}
        className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full"
      >
        <p className="font-thin">Offers</p>
      </div>
      <div
        onClick={() => navigate("/trainings")}
        className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full"
      >
        <p className="font-thin">Trainings</p>
      </div>
      <div
        onClick={() => navigate("/sellproduct")}
        className="flex items-center cursor-pointer hover:bg-gray-100 py-1 px-3 rounded-full"
      >
        <p className="font-thin">Sell</p>
      </div>
    </div>
  );
};

export default SSEFarmerMenu;