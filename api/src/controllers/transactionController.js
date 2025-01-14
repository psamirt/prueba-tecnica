const db = require("../firebase");

// Registrar una nueva transacción
const createTransaction = async (req, res) => {
  const { userId, amount, status } = req.body;

  if (!userId || amount === undefined || !status) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  if (amount <= 0) {
    return res.status(400).json({ error: "El monto debe ser positivo" });
  }

  try {
    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userData = userDoc.data();
    const currentBalance = userData.balance || 0;

    if (currentBalance + amount < 0) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    const transactionRef = db.collection("transactions").doc();
    await transactionRef.set({
      id: transactionRef.id,
      userId,
      amount,
      date: new Date().toISOString(),
      status,
    });

    await userRef.update({ balance: currentBalance + amount });

    res.status(201).json({ message: "Transacción registrada con éxito" });
  } catch (error) {
    console.error("Error al registrar transacción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Consultar historial de transacciones
const getTransactionsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const transactions = [];
    const transactionsRef = db
      .collection("transactions")
      .where("userId", "==", userId);
    const snapshot = await transactionsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No se encontraron transacciones" });
    }

    snapshot.forEach((doc) => {
      transactions.push(doc.data());
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

module.exports = {
  createTransaction,
  getTransactionsByUser,
};
