import React, { useEffect, useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, CardActionArea } from '@material-ui/core'

import { getContactsHandler, setContacts } from '../../ducks/contacts'
import { useSelector } from '../../reducers'
import { Card, PageProgress, CustomDialog } from '../../components/UI'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { deleteContact } from '../../externalApi/contacts'
import { AddCard } from './styled'
import AddForm from './AddForm'
import useAlert from '../../hooks/useAlert'



const Contacts: React.FC = () => {
  const dispatch = useDispatch()
  const [, setAlert] = useAlert()
  const [showAddForm, setShowAddForm] = useState<{ id: number, phone: string, name: string } | boolean | null>(null)
  const { contacts, search } = useSelector(state => state.contacts)
  const [contactsList, setContactsList] = useState(contacts.data)
  useEffect(() => {
    dispatch(getContactsHandler())
  }, [dispatch])

  useEffect(() => {
    if (search && contacts.data) {
      setContactsList(contacts.data.filter(el => {
        const currentName = el.name.toLowerCase()
        const currentPhone = el.phone
        return currentName.includes(search.toLowerCase()) || currentPhone.includes(search)
      }))
    } else {
      setContactsList(contacts.data)
    }

  }, [contacts.data, search])

  const deleteContactHandler = async (id: number) => {
    try {
      await deleteContact(id)
      dispatch(setContacts(contacts.data!.filter(el => el.id !== id)))
      setAlert.success('Successfuly deleted')
    } catch {
      setAlert.error("Error !")
    }
  }

  const closeAddForm = () => setShowAddForm(null)
  const openAddForm = (id: number, phone: string, name: string) => setShowAddForm({ id, phone, name })
  if (contacts.loading && !contactsList) return <PageProgress />

  return (
    <>
      <CustomDialog show={!!showAddForm} handleClose={closeAddForm}>
        <AddForm handleClose={closeAddForm} defaultValues={typeof showAddForm === 'object' && showAddForm !== null && showAddForm} /></CustomDialog>
      <Grid container justify="center">
        <Grid item sm={9} container justify="center">
          <AddCard><CardActionArea onClick={() => setShowAddForm(true)}><AddCircleOutlineIcon color="primary" /></CardActionArea></AddCard>
          {contactsList?.map(c => <Card id={c.id} key={c.id} title={c.name} phone={c.phone} openAddForm={openAddForm} deleteHandler={deleteContactHandler} />)}
        </Grid>
      </Grid>
    </>
  )
}

export default memo(Contacts)
