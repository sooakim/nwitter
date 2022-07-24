import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from 'firebase/firestore'
import app from './'
import {log} from '../logger'
import {logEvent} from './analytics'
import {ITweet} from '../../models/Tweet'
import {requireUser} from './auth'

const firestore = getFirestore(app)

export const createTweet = async (tweet: string) => {
  try {
    const collectionRef = collection(firestore, 'tweets')
    const {uid} = requireUser()
    await addDoc(collectionRef, {
      userId: uid,
      content: tweet,
      createdAt: serverTimestamp()
    })
    logEvent('createTweet', {
      'content': tweet
    })
  } catch (error) {
    log(error)
    throw error
  }
}

export const fetchTweets = async (): Promise<ITweet[]> => {
  try {
    const collectionRef = collection(firestore, 'tweets')
    const tweetsSnapshot = await getDocs(collectionRef)
    logEvent('fetchTweets')

    return tweetsSnapshot.docs.map((doc) => {
      const {content, userId, createdAt} = doc.data()
      return ({
        id: doc.id,
        userId: userId,
        content: content,
        createdAt: new Date(createdAt.toMillis()),
        isOwner: () => (requireUser().uid === userId)
      })
    })
  } catch (error) {
    log(error)
    throw error
  }
}

export const fetchTweetsWithCallback = (callback: ((tweets: ITweet[]) => void)): (() => void) => {
  const collectionRef = collection(firestore, 'tweets')
  const queryRef = query(collectionRef, orderBy('createdAt', 'desc'))
  return onSnapshot(queryRef, (snapshot) => {
    const tweets = snapshot.docs.map((doc) => {
      const {content, userId, createdAt} = doc.data()
      return ({
        id: doc.id,
        userId: userId,
        content: content,
        createdAt: createdAt === null ? new Date() : new Date(createdAt.toMillis()),
        isOwner: () => (requireUser().uid === userId)
      })
    })
    callback(tweets)
  })
}

export const deleteTweet = async (id: string) => {
  const collectionRef = collection(firestore, 'tweets')
  const documentRef = doc(collectionRef, id)
  try {
    await deleteDoc(documentRef)
    logEvent('deleteTweet')
  } catch (error) {
    log(error)
    throw error
  }
}
