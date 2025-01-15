import { Tabs } from "antd";
import Wallet from "./Wallet";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import Historial from "./Historial";
import { addFunds, getUserData,  payForSomething } from "../utils/hooks";
import toast from "react-hot-toast";

function TabGroup() {
  const { user } = useContext(UserContext);
  const [historial, setHistorial] = useState([]);
  const [balance, setBalance] = useState(user?.balance || 0);

  const fetchWalletData = async () => {
    if (user?.uid) {
      try {
        const data = await getUserData(user?.uid);
        setBalance(data.balance);
        setHistorial(data.transactions);
      } catch (error) {
        console.error("Error al obtener datos del wallet:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchWalletData();
  }, [user]);
  
  const handleSendMoney = async (amount) => {
    if (amount <= 0) {
      toast.error("El monto debe ser mayor a 0");
      return;
    }
    try {
      await toast.promise(
        addFunds(user?.uid, amount).then(() => fetchWalletData()),
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

  const handlePayForSomething = async (sellAmount) => {
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
        payForSomething(user?.uid, sellAmount).then(() => fetchWalletData()),
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

  const items = [
    {
      key: "1",
      label: <span className="text-white text-xl">Billetera</span>,
      children: (
        <Wallet
          user={user}
          balance={balance}
          handleSendMoney={handleSendMoney}
          handlePayForSomething={handlePayForSomething}
        />
      ),
    },
    {
      key: "2",
      label: <span className="text-white text-xl">Historial</span>,
      children: <Historial historial={historial} />,
    },
  ];

  return (
    <div>
      <Tabs className="" defaultActiveKey="1" items={items}></Tabs>
    </div>
  );
}

export default TabGroup;
