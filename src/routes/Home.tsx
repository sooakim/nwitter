import React, {ChangeEvent, MouseEvent, useCallback, useEffect, useState} from 'react'
import Navigation from '../components/navigation'
import {createTweet, fetchTweets} from '../libs/firebase/firestore'
import {ITweet} from '../models/Tweet'

const Home = () => {
  const [tweet, setTweet] = useState('')
  const [tweets, setTweets] = useState<ITweet[]>([])
  const onSubmit = useCallback(async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await createTweet(tweet)
    } catch {
    }
  }, [tweet])
  const onChange = useCallback(({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'tweet':
        setTweet(value)
        break
      default:
        break
    }
  }, [])

  useEffect(() => {
    (async () => {
      const tweets = await fetchTweets()
      setTweets(tweets)
    })()
  }, [])

  return (
    <div>
      <Navigation/>
      <form onSubmit={onSubmit}>
        <input name="tweet" type="text" placeholder="What's going on" maxLength={120} onChange={onChange}/>
        <input type="submit" value="tweet"/>
      </form>

      <div>
        <ul>
          {
            tweets.map((tweet) => <li key={tweet.id}>{`${tweet.content} - ${tweet.createdAt.toString()}`}</li>)
          }
        </ul>
      </div>
    </div>
  )
}
export default Home
