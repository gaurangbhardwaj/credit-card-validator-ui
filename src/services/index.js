export const validateCC = async (ccNumber) => {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ cc_number: ccNumber }),
    };
    const response = await fetch(`http://localhost:3001/validate-cc`, options);
    const data = await response.json();
    if (data.responseData && data.responseData) return data.responseData;
  } catch (error) {
    console.error("[validateCC] Error validateCC:", error);
  }
};
