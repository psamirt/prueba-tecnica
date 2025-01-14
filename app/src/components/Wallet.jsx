
function Wallet() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-lg text-white">
        A continuación usted podrá ver el saldo disponible en su billetera
        virtual, así como también ingresar saldo.
      </span>
      <div className="flex items-center justify-evenly w-full mt-4">
        <div>
          <span className="text-white">Saldo disponible: $0</span>
        </div>
        <div className="flex">
          <input
            type="number"
            placeholder="Ingrese el monto"
            className="p-2 "
          />
          <button className="p-2 bg-blue-500 text-white">
            Ingresar saldo
          </button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
