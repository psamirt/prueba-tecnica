import { Button } from "antd";
import { useState, useEffect, useCallback } from "react";

function Historial({ wallet }) {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const filterTransactions = useCallback(() => {
    let transactions = wallet || [];
    if (filterType === "credit") {
      transactions = transactions.filter((t) => t.type === "credit");
    } else if (filterType === "debit") {
      transactions = transactions.filter((t) => t.type === "debit");
    }
    transactions.sort((a, b) => {
      const dateA = new Date(
        (a.date.seconds || a.date._seconds) * 1000
      ).getTime();
      const dateB = new Date(
        (b.date.seconds || b.date._seconds) * 1000
      ).getTime();
      return dateB - dateA;
    });
    setFilteredTransactions(transactions);
  }, [filterType, wallet]);

  useEffect(() => {
    filterTransactions();
  }, [filterType, wallet, filterTransactions]);

  return (
    <div className="p-4 text-white">
      {/* obtener tipo de historial */}
      <h2 className="font-semibold text-lg">
        {filterType === "all" ? (
          <span>Historial completo</span>
        ) : filterType === "credit" ? (
          <span>Historial de ingresos</span>
        ) : filterType === "debit" ? (
          <span>Historial de gastos</span>
        ) : null}{" "}
      </h2>
      <div className="flex justify-evenly mt-4">
        <Button onClick={() => setFilterType("all")}>Historial completo</Button>
        <Button onClick={() => setFilterType("credit")}>Ingresos</Button>
        <Button onClick={() => setFilterType("debit")}>Gastos</Button>
      </div>
      <table className="table-auto w-full border-collapse border border-gray-200 mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Monto</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{transaction.id}</td>
              <td className="border px-4 py-2">{transaction.amount}</td>
              <td className="border px-4 py-2">{transaction.type}</td>
              <td className="border px-4 py-2">
                {transaction.date &&
                (transaction.date.seconds || transaction.date._seconds)
                  ? new Date(
                      (transaction.date.seconds || transaction.date._seconds) *
                        1000
                    ).toLocaleString()
                  : "Fecha no disponible"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Historial;
