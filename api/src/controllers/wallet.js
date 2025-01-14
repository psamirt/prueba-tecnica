const admin = require("firebase-admin");
const db = require("../firebase");

// Añadir fondos al usuario
const addFunds = async (req, res) => {
  const { uid, amount } = req.body;

  try {
    // Validar entrada
    if (!uid) {
      return res.status(400).json({ error: "El uid es requerido." });
    }
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return res
        .status(400)
        .json({ error: "El monto debe ser un número mayor a 0." });
    }

    const userRef = db.collection("users").doc(uid);

    // Realizar operación atómica con transacción
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

      // Registrar la transacción
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

// Obtener saldo del usuario por userId
const getFundsById = async (req, res) => {
  const { userId } = req.params;

  try {
    if (!userId) {
      return res.status(400).json({ error: "El userId es requerido." });
    }

    const userRef = db.collection("users").doc(userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const userData = userDoc.data();
    const currentBalance = userData.balance || 0;

    return res.status(200).json({ balance: currentBalance });
  } catch (error) {
    console.error("Error al obtener saldo:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Error interno del servidor." });
  }
};

const getTransactionsByUserId = async (req, res) => {
  const { uid } = req.params;

  try {
    const transactions = [];
    const transactionsRef = db
      .collection("transactions")
      .where("uid", "==", uid);
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
  addFunds,
  getFundsById,
  getTransactionsByUserId,
};
