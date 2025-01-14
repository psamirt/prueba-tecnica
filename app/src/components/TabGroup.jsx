import { Tabs } from "antd";
import Wallet from "./Wallet";
import Transaction from "./Transaction";
import Dashboard from "./Dashboard";

function TabGroup() {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    {
      key: "1",
      label: <span className="text-white text-xl">Billetera</span>,
      children: <Wallet />,
    },
    {
      key: "2",
      label: <span className="text-white text-xl">Transacción</span>,
      children: <Transaction />,
    },
    {
      key: "3",
      label: <span className="text-white text-xl">Dashboard</span>,
      children: <Dashboard />,
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
