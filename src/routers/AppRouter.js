import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter'
import { JournalScreen } from '../components/journal/JournalScreen'
import { login } from '../actions/auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import { startLoadingNotes } from '../actions/notes'

export const AppRouter = () => {
  const dispatch = useDispatch()
  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)
        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLoggedIn(false)
      }
      setChecking(false)
    })
  }, [])

  if (checking) {
    return (<h1>Please wait...</h1>)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/*' element={
            <PublicRoute isAuth={isLoggedIn}>
              <AuthRouter />
            </PublicRoute>
          }
        />
        <Route
          path='/' isAuthenticated={isLoggedIn} element={
            <PrivateRoute isAuth={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
