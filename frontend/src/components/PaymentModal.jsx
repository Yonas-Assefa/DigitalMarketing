import React from "react";
import { FaSpinner } from 'react-icons/fa';

const PaymentModal = ({ message, ontryAgain, title, status }) => {
  return (
    <div class={`relative z-10`}>
      <div
        class={`fixed inset-0 bg-gray-500 bg-opacity-10 transition-opacity`}
      ></div>

      <div class={`fixed inset-0 z-10 overflow-y-auto`}>
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">

                <FaSpinner
                  aria-hidden="true"
                  className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                />

                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    class={`text-base font-semibold leading-6 ${status == "failed"?"text-red-600":"text-gray-900"}`}
                    id="modal-title"
                  >
                    {title}
                  </h3>
                  <div class="mt-2 text-sm text-gray-500">
                    <p class="">
                      {message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {status == "failed" ? (
                <button
                style={{
                  background:'#054112',
               }}
                  onClick={ontryAgain}
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-900 sm:ml-3 sm:w-auto"
                >
                  Try Again
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
