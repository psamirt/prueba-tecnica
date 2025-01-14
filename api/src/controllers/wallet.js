const admin = require("firebase-admin");
const db = require("../firebase");

// Añadir fondos al usuario
const addFunds = async (req, res) => {
  const { amount } = req.body;
  const { uid } = req.params;

  try {
    // Validación de entrada
    if (!uid) {
      return res.status(400).json({ error: "El uid es requerido." });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "El monto debe ser un número mayor a 0." });
    }

    const userRef = db.collection("users").doc(uid);
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);

      // Verificar existencia del usuario
      if (!userDoc.exists) {
        throw new Error("Usuario no encontrado.");
      }

      const userData = userDoc.data();
      const currentBalance = userData.balance || 0;
      const newBalance = currentBalance + amount;

      // Actualizar saldo
      transaction.update(userRef, { balance: newBalance });
      transaction.set(db.collection("transactions").doc(), {
        uid,
        amount,
        type: "credit",
        date: admin.firestore.Timestamp.now(),
      });
    });

    return res.status(200).json({ message: "Fondos añadidos exitosamente." });
  } catch (error) {
    console.error("Error al añadir fondos:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Error interno del servidor." });
  }
};

//Obtener transacciones por usuario
const getTransactionsByUserId = async (req, res) => {
  const { uid } = req.params;

  try {
    const transactionsRef = db
      .collection("transactions")
      .where("uid", "==", uid);
    const snapshot = await transactionsRef.get();

    if (snapshot.empty) {
      return res.status(404).json({ error: "No se encontraron transacciones" });
    }

    const transactions = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Pagar por algo
const payForSomething = async (req, res) => {
  const { amount } = req.body;
  const { uid } = req.params;

  try {
    // Validación de entrada
    if (!uid) {
      return res.status(400).json({ error: "El uid es requerido." });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "El monto debe ser un número mayor a 0." });
    }

    const userRef = db.collection("users").doc(uid);
    await db.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef);

      // Verificar existencia del usuario
      if (!userDoc.exists) {
        throw new Error("Usuario no encontrado.");
      }

      const userData = userDoc.data();
      const currentBalance = userData.balance || 0;

      // Verificar si el usuario tiene suficientes fondos
      if (currentBalance < amount) {
        throw new Error("Fondos insuficientes.");
      }

      const newBalance = currentBalance - amount;

      // Actualizar saldo
      transaction.update(userRef, { balance: newBalance });
      transaction.set(db.collection("transactions").doc(), {
        uid,
        amount: -amount,
        type: "debit",
        date: admin.firestore.Timestamp.now(),
      });
    });

    return res.status(200).json({ message: "Pago realizado con éxito." });
  } catch (error) {
    console.error("Error al realizar el pago:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Error interno del servidor." });
  }
};

module.exports = {
  addFunds,
  getTransactionsByUserId,
  payForSomething,
};
