//!thousand Spreator

export const formatToRupiah = (value) => {
  if (!value) return ""; // Return an empty string if the value is not provided
  const numberFormat = new Intl.NumberFormat("id-ID");
  return numberFormat.format(value);
};

const removeThousandSeparators = (value) => {
  return value.replace(/[,.]/g, "");
};

export const handleAmountChange = (e, setAmount) => {
  const inputAmount = e.target.value;

  // Remove non-numeric characters (except dot if present)
  const numericAmount = removeThousandSeparators(
    inputAmount.replace(/[^0-9.]/g, "")
  );

  // Update the state with the numeric value
  setAmount(numericAmount);
};
