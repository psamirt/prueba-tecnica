import { useContext } from "react";
import TabGroup from "../components/TabGroup";
import { useSession } from "../utils/authConfig";
import { Button } from "antd";
import { UserContext } from "../components/UserProvider";

function Home() {
  const { closeSession } = useSession();
  const { user } = useContext(UserContext);

  return (
    <div className="">
      <div className="flex justify-between items-center p-4">
        <header className="text-white text-2xl">
          {" "}
          {user?.username} Bienvenido al dashboard de la prueba técnica
        </header>
        <Button onClick={closeSession} className="cursor-pointer p-2">
          Cerrar sesión
        </Button>
      </div>
      <TabGroup />
    </div>
  );
}

export default Home;
