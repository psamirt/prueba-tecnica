import API from "./ApiConfig";

export const addFunds = async (userId, amount) => {
  try {
    const response = await API.post(`/wallet/add-founds/${userId}`, { amount });
    return response.data;
  } catch (error) {
    console.error(
      "Error al añadir fondos:",
      error.response?.data || error.message
    );
    throw error;
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
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await API.get(`/wallet/get-user-wallet/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error al obtener datos del usuario",
      error.response?.data || error.message
    );
    throw error;
  }
};