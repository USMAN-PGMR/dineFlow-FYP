import { auth, firestore } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useReducer, useEffect, useState } from "react";
import Loader from "../copmonents/Loader/Loader";

export const AuthContext = createContext();

const initialState = { isAuthenticated: false }


const reducer = ((state, action) => {
  // console.log(state)
  // console.log(action)
  switch (action.type) {
    case "LOGIN":
      // return {isAuthenticated:true}
      return { isAuthenticated: true, user: action.payload.user }
    case "LOGOUT":
      return { isAuthenticated: false }
    default:
      return state
  }
})


export default function AuthContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null); // Set initial state to null

  // is tarha agr user login ho ga to isy dashboard and logout nazr at ga only
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        console.log('user is signed in')
        fetchUser(user)
        dispatch({ type: "LOGIN", payload: { user } })
        // ...
      } else {
        console.log('user is signed out')
        setIsLoading(false);
        // ...
      }
    });
  }, [])

  const fetchUser = async (user) => {
    if (user && user.uid) { // Check if user exists and has uid
      setIsLoading(true)
      try {
        const userId = user.uid;
        const docRef = doc(firestore, "users", userId);
        const docSnap = await getDoc(docRef);
        setUserInfo(docSnap.data());
        setIsLoading(false)
      } catch (error) {
        console.error(error);
        setUserInfo(null); // Set userInfo to null in case of an error
        setIsLoading(false)
      }
    } else {
      console.log("No UID");
      setUserInfo(null); // Set userInfo to null if user or uid is not available
    }
  };

  return (
    // <AuthContext.Provider value={{authenticated:state,dispatch}}>  //agr to ham chahty hain k jo user login ho is k hi todo show hon to ham spraed karain gy state ko
    <AuthContext.Provider value={{ ...state, dispatch, userInfo }}>
      {isLoading ? <Loader/> : <>{props.children}</>}
    </AuthContext.Provider>
  );
}
