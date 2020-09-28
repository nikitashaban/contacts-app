import { mainHost } from './api'


export const getContacts = async () => {
  const response = await fetch(`${mainHost}/contacts`)
  const contactsList = await response.json()
  return contactsList
}

export const createContact = async (data: { phone: string, name: string }) => {
  const response = await await fetch(`${mainHost}/contacts`, {
    method: "POST", headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(data)
  })
  const newContact = await response.json();
  return newContact
}

export const changeContact = async (id: number, data: { phone: string, name: string }) => {
  const response = await await fetch(`${mainHost}/contacts/${id}`, {
    method: "PUT", headers: {
      'Content-Type': 'application/json',
    }, body: JSON.stringify(data)
  })
  const changedContact = await response.json();
  return changedContact
}

export const deleteContact = async (id: number) => await fetch(`${mainHost}/contacts/${id}`, { method: "DELETE" })