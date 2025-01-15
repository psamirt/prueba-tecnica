import API from "./ApiConfig";

export const getWallet = async (userId) => {
  try {
    const response = await API.get(`/wallet/get-transactions/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener la billetera:",
      error.response?.data || error.message
    );
  }
};

export const addFunds = async (userId, amount) => {
  try {
    const response = await API.post(`/wallet/add-founds/${userId}`, { amount });
    return response.data;
  } catch (error) {
    console.error(
      "Error al añadir fondos:",
      error.response?.data || error.message
    );
  }
};

export const payForSomething = async (userId, amount) => {
  try {
    const response = await API.post(`/wallet/pay-for-something/${userId}`, {
      amount,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error al pagar por algo:",
      error.response?.data || error.message
    );
  }
};

// // obtener el refreshToken
// export const refreshIdToken = async (refreshToken) => {
//   const url = `https://securetoken.googleapis.com/v1/token?key=${
//     import.meta.env.VITE_FIREBASE_API_KEY
//   }`;
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         grant_type: "refresh_token",
//         refresh_token: refreshToken,
//       }),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error al renovar el token:", error);
//     throw error;
//   }
// };
