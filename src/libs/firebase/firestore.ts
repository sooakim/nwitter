import {addDoc, collection, getFirestore, serverTimestamp} from 'firebase/firestore'
import app from './'
import {log} from '../logger'
import {logEvent} from './analytics'

const firestore = getFirestore(app)

export const createTweet = async (tweet: string) => {
  try {
    const collectionRef = collection(firestore, 'tweets')
    await addDoc(collectionRef, {
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
