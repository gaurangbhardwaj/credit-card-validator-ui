import visa from "../assets/icons/visa.svg";
import mastercard from "../assets/icons/mastercard.svg";
import amex from "../assets/icons/amex.svg";
import diners from "../assets/icons/diners.svg";

export const getCardType = (creditCardNumber = "") => {
  if (!creditCardNumber) return "";
  const number = creditCardNumber.split("-").join("");
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null) return "visa";

  // Mastercard
  // Updated for Mastercard 2017 BINs expansion
  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return "mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null) return "amex";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null) return "diners";

  return "";
};

export const cardIcon = {
  visa: visa,
  mastercard: mastercard,
  amex: amex,
  diners: diners,
};

export const toastifyDefaultSettings = {
  position: "top-center",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  theme: "dark",
};
