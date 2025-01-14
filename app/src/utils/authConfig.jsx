import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useCallback, useContext, useEffect } from "react";
import { db } from "./credentials";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";

export const useSession = () => {
  const auth = getAuth();
  const SESSION_EXPIRY_DAYS = 30;
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const closeSession = useCallback(async () => {
    try {
      await auth.signOut();
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }, [auth, setUser, navigate]);

  useEffect(() => {
    const checkSessionExpiry = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const now = new Date();
        const expiryDate = new Date(parseInt(loginTime));
        expiryDate.setDate(expiryDate.getDate() + SESSION_EXPIRY_DAYS);
        if (now > expiryDate) {
          if (auth.currentUser) {
            closeSession();
          }
        }
      }
    };

    checkSessionExpiry();
  }, [auth, closeSession]);

  const registerWithEmail = async (email, password, username) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        username: username,
        createdAt: new Date(),
      });
      await updateProfile(user, {
        displayName: username,
      });
      localStorage.setItem('loginTime', Date.now().toString())
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const restartPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
    }
  };

  const changePassword = async (newPassword) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        await updateDoc(doc(db, "users", user.uid), {
          passwordChangedAt: new Date(),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem('loginTime', Date.now().toString())
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          createdAt: new Date(),
        });
      }
      localStorage.setItem('loginTime', Date.now().toString())
      setUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    closeSession,
    registerWithEmail,
    signInWithEmail,
    restartPassword,
    changePassword,
    signInWithGoogle,
  };
};
