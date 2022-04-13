import React, { forwardRef } from 'react';
import { Alert, Slide, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { setSnackbar } from '../../redux/slices/snackbarSlice';

const Transition = forwardRef((props, ref) => {
  return <Slide ref={ref} {...props} direction="left" />;
});

const AlertStyled = styled(Alert)(({ theme, severity }) => ({
  width: '100%',
  color: 'white',
  backgroundColor:
    severity === 'success'
      ? theme.palette.success.dark
      : theme.palette.error.main,
  '& .MuiAlert-icon': {
    color: 'white'
  }
}));

export default function SuccessSnackbar() {
  const dispatch = useDispatch();
  const { isOpen, severity, msg } = useSelector((state) => state.snackbar);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(
      setSnackbar({
        isOpen: false,
        severity,
        msg
      })
    );
  };

  return (
    <Snackbar
      open={isOpen}
      TransitionComponent={Transition}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AlertStyled onClose={handleClose} severity={severity}>
        {msg}
      </AlertStyled>
    </Snackbar>
  );
}
