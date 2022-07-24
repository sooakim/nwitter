import React, {ChangeEvent, FormEvent, useCallback, useState} from 'react'
import {login, register} from '../libs/firebase/auth'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setRegister] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const onChange = useCallback(({target: {name, value, checked}}: ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'email':
        setEmail(value)
        break
      case 'password':
        setPassword(value)
        break
      case 'register':
        setRegister(checked)
        break
      default:
        break
    }
  }, [])
  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (isRegister) {
        await register(email, password)
      } else {
        await login(email, password)
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }, [email, password, isRegister])

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required aria-required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" required aria-required value={password}
               onChange={onChange}/>
        <label htmlFor="register">가입</label>
        <input name="register" type="checkbox" checked={isRegister} onChange={onChange}/>
        <input type="submit" value={isRegister ? 'Register' : 'Login'}/>
      </form>

      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>

      <div>
        <span>{error}</span>
      </div>
    </div>
  )
}
export default Auth
