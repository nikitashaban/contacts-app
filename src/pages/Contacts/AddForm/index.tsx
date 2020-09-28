import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Button, Grid } from '@material-ui/core'

import useAlert from '../../../hooks/useAlert'
import { useSelector } from '../../../reducers'
import { setContacts } from '../../../ducks/contacts'
import { createContact, changeContact } from '../../../externalApi/contacts'
import { Form, Input, WarningText } from './styled'

interface IForm {
  name: string;
  phone: string;
}

interface IProps {
  defaultValues?: { id: number, phone: string, name: string } | false
  handleClose: () => void
}

let values = { phone: '', name: '' }

const AddForm: React.FC<IProps> = ({ defaultValues, handleClose }) => {
  const dispatch = useDispatch()
  const [, setAlert] = useAlert()
  const { contacts } = useSelector(state => state.contacts)
  const { handleSubmit, setValue, reset, control, errors } = useForm<IForm>({
    defaultValues: values
  })


  useEffect(() => {
    if (defaultValues) {
      setValue('name', defaultValues.name)
      setValue('phone', defaultValues.phone)
      values = { phone: defaultValues.phone, name: defaultValues.name };
      return () => reset()
    }
  }, [setValue, defaultValues, reset])



  console.log(errors)
  const submitHandler = handleSubmit(async ({ name, phone }) => {
    try {
      if (defaultValues && contacts.data) {
        const changedContact = await changeContact(defaultValues.id, { name: name, phone: phone })
        const modifiedContacts = contacts.data.map(c => c.id === defaultValues.id ? changedContact : c)
        dispatch(setContacts(modifiedContacts))
        setAlert.success('Successfully changed')
      }
      if (!defaultValues && contacts.data) {
        const newContact = await createContact({ name, phone })
        dispatch(setContacts([...contacts.data, newContact]))
        setAlert.success('Successfully created')
      }
      handleClose()
    } catch (err) {
      setAlert.error('Error !')
      handleClose()
    }

  })

  return (
    <Form onSubmit={submitHandler} >
      <Controller rules={{ required: true, minLength: 2, maxLength: 25 }} control={control} name="name" as={<Input label="name" variant="outlined" />} />
      <WarningText>{errors.name && "Your name have to be more than 2 symbols and less than 25 symbols"}</WarningText>
      <Controller onKeyUp={(e: any) => {
        let x = e.target.value
          .replace(/\D/g, "")
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2]
          ? x[1]
          : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      }}
        rules={{ required: true }}
        control={control} name="phone" as={<Input label="phone" variant="outlined" />} />
      <WarningText>{errors.phone && "Phone is required field"}</WarningText>
      <Grid container justify="flex-end">
        <Button type="submit" color="primary">Add</Button>
        <Button onClick={handleClose} color="primary">Cancel</Button>
      </Grid>
    </Form>
  )
}

export default AddForm
