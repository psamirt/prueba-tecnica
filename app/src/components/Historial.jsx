function Historial({ wallet }) {

  return (
    <div className="p-4 text-white">
      <h2 className="font-semibold text-lg">Historial de Transacciones</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Monto</th>
            <th className="border px-4 py-2">Tipo</th>
            <th className="border px-4 py-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {wallet?.map((transaction, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{transaction?.id}</td>
              <td className="border px-4 py-2">{transaction?.amount}</td>
              <td className="border px-4 py-2">{transaction?.type}</td>
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
