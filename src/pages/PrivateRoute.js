import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate, Route } from 'react-router-dom';

export default function PrivateRoute({ Component }) {

  
  const { isAuthenticated } = useContext(AuthContext)

  if (!isAuthenticated)
    return (<Navigate to="/auth/login" />)

  return (
    <Component />
  )
}