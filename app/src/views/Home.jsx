import TabGroup from "../components/TabGroup";
import { useSession } from "../utils/authConfig";
import { Button } from "antd";

function Home() {
  const { closeSession } = useSession();
  return (
    <div className="">
      <div className="flex justify-between items-center p-4">
        <header className="text-white text-2xl">Bienvenido a la prueba técnica</header>
        <Button onClick={closeSession} className="cursor-pointer p-2">
          Cerrar sesión
        </Button>
      </div>
      <TabGroup />
    </div>
  );
}

export default Home;
