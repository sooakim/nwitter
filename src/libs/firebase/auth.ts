import {app} from './'
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {logEvent} from './analytics'
import {log} from '../logger'

const auth = getAuth(app);
(async () => {
  await setPersistence(auth, browserSessionPersistence)
})()

export const isSigned = auth.currentUser !== null

export const setSignChanged = (callback: ((user: {isSigned: boolean}) => void)): (() => void) => {
  return onAuthStateChanged(auth, (user) => {
    callback({isSigned: user !== null})
  }, (error) => {
    log(error)
  }, () => {

  })
}

export const register = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    logEvent('register')
  } catch (error) {
    log(error)
    throw error
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    logEvent('login')
  } catch (error) {
    log(error)
    throw error
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
    logEvent('logout')
  } catch (error) {
    log(error)
    throw error
  }
}
