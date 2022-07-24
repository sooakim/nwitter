import {addDoc, collection, getDocs, getFirestore, serverTimestamp} from 'firebase/firestore'
import app from './'
import {log} from '../logger'
import {logEvent} from './analytics'
import {ITweet} from '../../models/Tweet'

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

export const fetchTweets = async (): Promise<ITweet[]> => {
  try {
    const collectionRef = collection(firestore, 'tweets')
    const tweetsSnapshot = await getDocs(collectionRef)
    logEvent('fetchTweets')

    return tweetsSnapshot.docs.map((doc) => {
      const {content, createdAt} = doc.data()
      return (
        {
          id: doc.id,
          content: content,
          createdAt: new Date(createdAt.toMillis())
        })
    })
  } catch (error) {
    log(error)
    throw error
  }
}
