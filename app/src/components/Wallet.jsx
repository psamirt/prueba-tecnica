import { useState, useEffect } from "react";
import { addFunds } from "../utils/hooks";
import toast from "react-hot-toast";

function Wallet({ user }) {
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(user?.balance || 0);

  useEffect(() => {
    setBalance(user?.balance || 0);
  }, [user]);

  const handleChange = (e) => {
    e.preventDefault();
    setAmount(Number(e.target.value));
  };

  const handleSendMoney = async () => {
    if (amount <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }
    await toast.promise(
      addFunds(user?.uid, amount).then(() => {
        setAmount(0);
        setBalance((prevBalance) => prevBalance + amount);
      }),
      {
        loading: "Añadiendo fondos...",
        success: "Fondos añadidos correctamente",
        error: "Error al añadir fondos",
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-lg text-white">
        A continuación usted podrá ver el saldo disponible en su billetera
        virtual, así como también ingresar saldo.
      </span>
      <div className="flex items-center justify-evenly w-full mt-4">
        <div>
          <span className="text-white">Saldo disponible: ${balance}</span>
        </div>
        <div className="flex mt-5 ">
          <div className="flex flex-col">
            <label className="text-white">Ingresar saldo</label>
            <input
              type="number"
              className="p-2 rounded"
              value={amount}
              onChange={handleChange}
            />
          </div>
          <button
            className="p-2 m-5 bg-blue-500 text-white rounded"
            onClick={handleSendMoney}
          >
            Ingresar saldo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
