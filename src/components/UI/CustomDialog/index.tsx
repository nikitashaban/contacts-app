import React, { memo } from "react";
import { Dialog, Slide, Grid } from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";
import CloseIcon from "@material-ui/icons/Close";

import { CloseButton, Content } from './styled'

const Transition = React.forwardRef(function Transition(props: TransitionProps & { children?: React.ReactElement<any, any> }, ref: React.Ref<unknown>) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  show: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const InfoDialog: React.FC<IProps> = ({ handleClose, show, children }) => {


  return (
    <Dialog open={show} TransitionComponent={Transition} keepMounted onClose={handleClose}>
      <Grid container justify="flex-end" alignItems="center">
        <CloseButton onClick={handleClose} >
          <CloseIcon />
        </CloseButton>
      </Grid>
      <Content>{children}</Content>
    </Dialog>
  );
};

export default memo(InfoDialog);
