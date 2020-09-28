import React, { memo } from 'react';
import { CardActions, CardContent, Typography, IconButton } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ContactCard, ContactCardMedia } from './styled'

interface IProps {
  title: string,
  phone: string,
  deleteHandler: (id: number) => void,
  id: number,
  openAddForm: (id: number, phone: string, name: string) => void
}


const Card: React.FC<IProps> = ({ title, phone, deleteHandler, id, openAddForm }) => {

  return (
    <ContactCard >
      <ContactCardMedia
        image="https://images.idgesg.net/images/article/2017/09/ios-contacts-icon-100735815-large.jpg"
        title="Contact"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {phone}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => openAddForm(id, phone, title)} size="small" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => deleteHandler(id)} size="small" color="primary">
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </ContactCard>
  );
}

export default memo(Card)