import { useSession } from "../utils/authConfig";
import { CiLogout } from "react-icons/ci";

function Dashboard() {
  const { closeSession } = useSession();
  return (
    <>
      <div>Dasdasdasd</div>
      <button onClick={closeSession} className="cursor-pointer p-2">
        <CiLogout size="50" />
      </button>
    </>
  );
}

export default Dashboard;
