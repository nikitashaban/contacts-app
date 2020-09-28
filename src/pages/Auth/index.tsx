import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

import { useSelector } from '../../reducers'
import { loginHandler } from '../../ducks/auth'
import { Form, Input, SignInBtn, WarningText } from './styled'

interface IForm {
  login: string;
  password: string;
}

const Auth = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm<IForm>()
  const { authInfo } = useSelector(state => state.auth)
  const submitHandler = handleSubmit((data) => {
    dispatch(loginHandler(data.login, data.password))
  })
  return (
    <Form onSubmit={submitHandler} >
      <Input name="login" inputRef={register({ required: true })} label="login" variant="outlined" />
      <Input name="password" inputRef={register({ required: true })} type="password" label="password" variant="outlined" />
      <WarningText>{authInfo.error && "Your password or login is incorrect"}</WarningText>
      <SignInBtn disabled={authInfo.loading} type="submit" variant="contained" color="primary">Sign in</SignInBtn>
    </Form>
  )
}

export default Auth
