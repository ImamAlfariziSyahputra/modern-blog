/* eslint-disable react/no-unescaped-entities */
/* eslint-disable camelcase */
import { Icon } from '@iconify/react';
import { forwardRef, useRef, useState } from 'react';
import Link from 'next/link';
// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Dialog,
  Button,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// Icons
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// Actions
import { useDeletePostMutation } from '@/redux/apis/postApi';

const GreenMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.success.light,
}));

const RedMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.light,
}));

// ----------------------------------------------------------------------

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props, ref) => {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function TableActionMenu({ id, name }) {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  // const dispatch = useDispatch();

  const [deletePost] = useDeletePostMutation();
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onDelete = async () => {
    try {
      await deletePost(id).unwrap();
      setIsOpen(false);
      setConfirmOpen(false);
      console.log('Delete Success!');
      // dispatch(
      //   setSnackbar({
      //     isOpen: true,
      //     severity: 'success',
      //     msg: 'Data berhasil dihapus.'
      //   })
      // );
    } catch (err) {
      setIsOpen(false);
      setConfirmOpen(false);
      console.log('Delete ERROR! => ', err);
      // dispatch(
      //   setSnackbar({
      //     isOpen: true,
      //     severity: 'error',
      //     msg: 'Data gagal dihapus.'
      //   })
      // );
    }
  };

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={`/blog/edit/${id}`} passHref>
          <GreenMenuItem component="a" onClick={() => setIsOpen(false)}>
            <ListItemIcon>
              <Icon
                icon={editFill}
                width={24}
                height={24}
                className="!text-green-500"
              />
            </ListItemIcon>
            <ListItemText
              primary="Ubah"
              primaryTypographyProps={{ variant: 'body2' }}
            />
          </GreenMenuItem>
        </Link>

        <RedMenuItem
          onClick={() => {
            setConfirmOpen(true);
          }}
        >
          <ListItemIcon>
            <Icon
              icon={trash2Outline}
              width={24}
              height={24}
              color="error"
              className="!text-red-400"
            />
          </ListItemIcon>
          <ListItemText
            primary="Hapus"
            primaryTypographyProps={{ variant: 'body2' }}
          />
        </RedMenuItem>

        <Dialog
          open={confirmOpen}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => {
            setConfirmOpen(false);
          }}
          aria-describedby="alert-delete-confirmation"
        >
          <DialogTitle>Yakin ingin menghapus "{name}" ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-delete-confirmation">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda, voluptatum magnam illum eveniet animi consectetur omnis
              dolore
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsOpen(false);
                setConfirmOpen(false);
              }}
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={handleSubmit(onDelete)}
              loading={isSubmitting}
            >
              Agree
            </LoadingButton>
          </DialogActions>
        </Dialog>
      </Menu>
    </>
  );
}
