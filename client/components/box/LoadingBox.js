import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const BoxStyled = styled(
  Box,
  {}
)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '2rem'
});

export default function LoadingBox() {
  return (
    <BoxStyled>
      <CircularProgress size={50} />
      <p>Sedang memuat data...</p>
    </BoxStyled>
  );
}
