import React, {ChangeEvent, MouseEvent, useCallback, useState} from 'react'
import Navigation from '../components/navigation'
import {createTweet} from '../libs/firebase/firestore'

const Home = () => {
  const [tweet, setTweet] = useState('')
  const onSubmit = useCallback(async (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault()

    await createTweet(tweet)
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

  return (
    <div>
      <Navigation/>
      <form onSubmit={onSubmit}>
        <input name="tweet" type="text" placeholder="What's going on" maxLength={120} onChange={onChange}/>
        <input type="submit" value="tweet"/>
      </form>
    </div>
  )
}
export default Home
