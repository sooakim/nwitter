import React, {MouseEvent, useCallback} from 'react'
import {ITweet} from '../../models/Tweet'
import {deleteTweet} from '../../libs/firebase/firestore'

interface ITweetProps {
  tweet: ITweet
}

const Tweet = ({tweet}: ITweetProps) => {
  const onClick = useCallback(async ({currentTarget: {name}}: MouseEvent<HTMLButtonElement>) => {
    switch (name) {
      case 'delete':
        const ok = window.confirm('really want to delete it?')
        if (ok) {
          await deleteTweet(tweet.id)
        }
        break
      case 'update':
        break
      default:
        break
    }
  }, [tweet.id])

  return (
    <div>
      <span>{`${tweet.content} - ${tweet.createdAt.toString()}`}</span>
      {
        tweet.isOwner() ? (
          <>
            <button name="delete" onClick={onClick}>delete</button>
            <button name="update" onClick={onClick}>edit</button>
          </>
        ) : (
          <></>
        )}
    </div>
  )
}
export default Tweet
