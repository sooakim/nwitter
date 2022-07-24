import React, {ChangeEvent, FormEvent, MouseEvent, useCallback, useState} from 'react'
import {ITweet} from '../../models/Tweet'
import {deleteTweet, updateTweet} from '../../libs/firebase/firestore'

interface ITweetProps {
  tweet: ITweet
}

const Tweet = ({tweet}: ITweetProps) => {
  const [isEditing, setEditing] = useState(false)
  const [text, setText] = useState('')
  const onClick = useCallback(async ({currentTarget: {name}}: MouseEvent<HTMLButtonElement>) => {
    switch (name) {
      case 'delete':
        const ok = window.confirm('really want to delete it?')
        if (ok) {
          await deleteTweet(tweet.id)
        }
        break
      case 'update':
        setEditing(true)
        break
      case 'cancel':
        setEditing(false)
        break
      default:
        break
    }
  }, [tweet.id])
  const onChange = useCallback(({target: {name, value}}: ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'text':
        setText(value)
        break
      default:
        break
    }
  }, [])
  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await updateTweet(tweet.id, text)
    } catch {

    } finally {
      setEditing(false)
    }

  }, [tweet.id, text])

  return (
    <div>
      {
        isEditing ? (
          <>
            <form onSubmit={onSubmit}>
              <input name="text" type="text" value={text} onChange={onChange} required/>
              <input type="submit" value="Save"/>
            </form>
            <button name="cancel" onClick={onClick}>cancel</button>
          </>
        ) : (
          <>
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
          </>
        )
      }
    </div>
  )
}
export default Tweet
