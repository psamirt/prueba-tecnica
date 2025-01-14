import { Tabs } from "antd";
import Wallet from "./Wallet";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import Historial from "./Historial";
import { getWallet } from "../utils/hooks";

function TabGroup() {
  const { user } = useContext(UserContext);
  const [wallet, setWallet] = useState([]);

  const onChange = (key) => {
    console.log(key);
  };

  useEffect(() => {
    const fetchWallet = async () => {
      const data = await getWallet(user?.uid);
      setWallet(data);
    };
    fetchWallet();
  }, [user?.uid]);

  const items = [
    {
      key: "1",
      label: <span className="text-white text-xl">Billetera</span>,
      children: <Wallet user={user} />,
    },
    {
      key: "2",
      label: <span className="text-white text-xl">Historial</span>,
      children: <Historial wallet={wallet} />,
    },
  ];

  return (
    <div>
      <Tabs
        className=" "
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      ></Tabs>
    </div>
  );
}

export default TabGroup;
