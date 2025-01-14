import { useState, useEffect } from "react";
import { addFunds, payForSomething } from "../utils/hooks";
import toast from "react-hot-toast";

function Wallet({ user }) {
  const [amount, setAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [balance, setBalance] = useState(user?.balance || 0);

  useEffect(() => {
    setBalance(user?.balance || 0);
  }, [user]);

  const handleSendMoney = async () => {
    if (amount <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }

    try {
      await toast.promise(
        addFunds(user?.uid, amount).then(() => {
          setAmount(0);
          setBalance((prevBalance) => prevBalance + amount);
        }),
        {
          loading: "Añadiendo fondos...",
          success: `Se añadieron $${amount} correctamente.`,
          error: "Error al añadir fondos.",
        }
      );
    } catch (error) {
      console.error("Error al añadir fondos:", error);
    }
  };

  const handlePayForSomething = async () => {
    if (sellAmount <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }

    if (sellAmount > balance) {
      toast.error("Fondos insuficientes.");
      return;
    }

    try {
      await toast.promise(
        payForSomething(user?.uid, sellAmount).then(() => {
          setSellAmount(0);
          setBalance((prevBalance) => prevBalance - sellAmount);
        }),
        {
          loading: "Realizando pago...",
          success: `Pago de $${sellAmount} realizado correctamente.`,
          error: "Error al realizar el pago.",
        }
      );
    } catch (error) {
      console.error("Error al realizar el pago:", error);
    }
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
        <div className="flex mt-5">
          <div className="flex flex-col">
            <label className="text-white">Ingresar saldo</label>
            <input
              type="number"
              className="p-2 rounded"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
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
      <div className="flex items-center justify-evenly w-full mt-4">
        <div>
          <span className="text-white">Comprar algo</span>
        </div>
        <div className="flex mt-5">
          <div className="flex flex-col">
            <label className="text-white">Ingresar monto</label>
            <input
              type="number"
              className="p-2 rounded"
              value={sellAmount}
              onChange={(e) => setSellAmount(Number(e.target.value))}
            />
          </div>
          <button
            className="p-2 m-5 bg-blue-500 text-white rounded"
            onClick={handlePayForSomething}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
