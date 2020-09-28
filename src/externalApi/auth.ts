import { mainHost } from './api'

export const getUsers = async () => {
  const response = await fetch(`${mainHost}/users`)
  const userList = await response.json()
  return userList
}