import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const userData = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
            } else {
                setUser(null);
                localStorage.removeItem("user");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log("User signed in:", result.user);
            return result.user;
        } catch (error) {
            console.error("Error during sign-in:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
