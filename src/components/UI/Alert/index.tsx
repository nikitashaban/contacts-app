import React from "react";
import { Snackbar, IconButton } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { CustomMuiAlert } from './styled'
import useAlert from "./../../../hooks/useAlert";




const CustomAlert = () => {

  const [alert, setAlert] = useAlert();
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlert.close();
  };

  return (
    <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <CustomMuiAlert elevation={12} variant="filled" severity={alert.status}>{alert.text}<IconButton onClick={handleClose}><HighlightOffIcon style={{ color: "#fff" }} /></IconButton> </CustomMuiAlert>
    </Snackbar>
  );
};

export default CustomAlert;
