import axios from 'axios';
export const getWallet = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/wallet/get-transactions/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener la billetera:", error.response?.data || error.message);
    }
};

export const addFunds = async (userId, amount) => {
    try {
        const response = await axios.post(`http://localhost:3000/wallet/add-founds/${userId}`, { amount });
        return response.data;
    } catch (error) {
        console.error("Error al añadir fondos:", error.response?.data || error.message);
    }
}