import React, {ChangeEvent, MouseEvent, useCallback, useEffect, useState} from 'react'
import Navigation from '../components/navigation'
import {createTweet, fetchTweetsWithCallback} from '../libs/firebase/firestore'
import {ITweet} from '../models/Tweet'
import Tweet from '../components/tweet'

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
    return fetchTweetsWithCallback((tweets) => {
      setTweets(tweets)
    })
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
            tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet}/>)
          }
        </ul>
      </div>
    </div>
  )
}
export default Home
