import { auth } from "../config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useReducer,useEffect } from "react";

export const AuthContext = createContext();

const initialState={isAuthenticated:false}


const reducer = ((state, action)=>{
    // console.log(state)
    // console.log(action)
    switch(action.type) {
        case"LOGIN":
        // return {isAuthenticated:true}
        return {isAuthenticated:true ,user:action.payload.user}
        case"LOGOUT":
        return {isAuthenticated:false}
        default:
            return state
    }
})


export default function AuthContextProvider(props) {
  const [state,dispatch]=useReducer(reducer,initialState)
  // is tarha agr user login ho ga to isy dashboard and logout nazr at ga only
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        console.log('user is signed in')
        dispatch({type:"LOGIN",payload:{user}})
        // ...
      } else {
        console.log('user is signed out')
        // ...
      }
    });
  },[])

  return (
    // <AuthContext.Provider value={{authenticated:state,dispatch}}>  //agr to ham chahty hain k jo user login ho is k hi todo show hon to ham spraed karain gy state ko
    <AuthContext.Provider value={{...state,dispatch}}>
      {props.children}
    </AuthContext.Provider>
  );
}
