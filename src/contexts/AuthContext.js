import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../fire"
import { updateDoc, setDoc, doc, getDoc } from "firebase/firestore";
import {createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [authError, setAuthError] = useState("");
    const [userInfo, setUserInfo] = useState({});

    const signInWithEmail = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            try {
                await setDoc(doc(firestore, "users", user.uid), {
                    email: user.email,
                    provider: "email"
                });

            } catch (e) {
                console.error("Error adding document: ", e);
            }
            setCurrentUser(user)
        }
        catch (err) {
            setAuthError(err.message)
        }

    }

    const logInWithEmail = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            console.log(user)
        }
        catch (error) {
            const errorMessage = error.message;
            setAuthError(errorMessage)
            setCurrentUser(null)
        };
    }

    const logOut = () => {
        signOut(auth).then(() => {
            setCurrentUser(null)
        }).catch((error) => {
            setAuthError(error)
        });
    }

    const updateUserInfo = async (name, address, age ,hobbies) => {
        try {


            await updateDoc(doc(firestore, "users", currentUser.uid), {
                full_name: name,
                address: address,
                age: age,
                hobbies: hobbies
            });
        } catch (err) {
            setAuthError(err)
        }
    }

    const getUserInfo = async () => {

        

        const docRef = doc(firestore, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserInfo(docSnap.data())
        } else {
            setAuthError("No user")
        }
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        signInWithEmail,
        logOut,
        logInWithEmail,
        updateUserInfo,
        getUserInfo,
        currentUser,
        authError,
        userInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}