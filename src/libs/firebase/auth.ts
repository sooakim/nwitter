import app from './'
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User
} from 'firebase/auth'
import {logEvent} from './analytics'
import {log} from '../logger'

const auth = getAuth(app);
(async () => {
  await setPersistence(auth, browserSessionPersistence)
})()

export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()

export const getUser = (): User | null => auth.currentUser

export const requireUser = (): User => {
  const user = auth.currentUser
  if (user === null) {
    throw Error('unauthorized user')
  }
  return user
}

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

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider)
    logEvent('login', {
      method: 'google'
    })
  } catch (error) {
    log(error)
    throw error
  }
}

export const loginWithGithub = async () => {
  try {
    await signInWithPopup(auth, githubProvider)
    logEvent('login', {
      method: 'github'
    })
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
