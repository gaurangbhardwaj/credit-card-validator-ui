import React, { useMemo, useState } from "react";
import CryptoJS from "crypto-js";

import { getCardType, cardIcon, toastifyDefaultSettings } from "../../utils";
import { toast } from "react-toastify";

import { validateCC } from "../../services/index";

const secretKey = "5530ef44815bb15e55d969d4c9f0961c";

const CreditCard = () => {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, "");
    const formattedValue = inputValue
      .replace(/(\d{4})(\d{4})?(\d{4})?(\d{4})?/, (_, p1, p2, p3, p4) => {
        let result = p1;
        if (p2) result += "-" + p2;
        if (p3) result += "-" + p3;
        if (p4) result += "-" + p4;
        return result;
      })
      .trim()
      .slice(0, 19);

    setCreditCardNumber(formattedValue);
  };

  const handleValidate = async () => {
    try {
      setIsValidating(true);
      const ccNum = creditCardNumber.split("-").join("");
      const encryptedCreditCard = CryptoJS.AES.encrypt(
        ccNum,
        secretKey
      ).toString();
      const validateRes = await validateCC(encryptedCreditCard);
      if (validateRes?.is_valid)
        toast.success("Credit Card is valid", toastifyDefaultSettings);
      else toast.error("Invalid Credit Card", toastifyDefaultSettings);
    } catch {
      toast.error("Invalid Credit Card", toastifyDefaultSettings);
    } finally {
      setIsValidating(false);
    }
  };

  const cardType = useMemo(
    () => getCardType(creditCardNumber),
    [creditCardNumber]
  );

  const isBtnDisabled = creditCardNumber?.length < 19;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <label className="block text-white mb-6 font-bold text-xl">
        Validate Your Credit Card
      </label>
      <div className="bg-gray-800 p-8 rounded-lg w-96">
        <label className="block text-white mb-4 text-sm">
          Credit Card Number
        </label>
        <div className="relative mb-4">
          <input
            type="text"
            value={creditCardNumber}
            onChange={handleInputChange}
            maxLength="19"
            className={`bg-gray-700 text-white p-3 w-full rounded  ${
              cardType ? "pl-12" : ""
            }`}
            placeholder="Enter credit card number"
          />
          {cardType && (
            <img
              src={cardIcon[cardType]}
              alt={cardType}
              className="absolute left-4 top-3 w-6 h-6"
            />
          )}
        </div>
        {isValidating ? (
          <div className="p-3 w-full flex flex-row justify-center">
            <svg
              aria-hidden="true"
              class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          <button
            disabled={isBtnDisabled}
            onClick={handleValidate}
            className={`mt-4 text-white p-3 w-full rounded  ${
              isBtnDisabled
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            Validate
          </button>
        )}
      </div>
    </div>
  );
};

export default CreditCard;
