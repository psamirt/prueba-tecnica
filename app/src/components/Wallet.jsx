import { useState } from "react";

function Wallet({ balance, handleSendMoney, handlePayForSomething }) {
  const [amount, setAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);

  const handleAddFunds = () => {
    handleSendMoney(amount);
    setAmount(0);
  };

  const handlePay = () => {
    handlePayForSomething(sellAmount);
    setSellAmount(0);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-lg text-white">
        A continuación usted podrá ver el saldo disponible en su billetera
        virtual, así como también ingresar saldo.
      </span>
      <div className="flex items-center justify-evenly w-full mt-4">
        <div>
          <span className="text-white">
            Saldo disponible:{" "}
            <span className="font-bold text-lg">${balance}</span>
          </span>
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
            onClick={handleAddFunds}
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
            onClick={handlePay}
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
