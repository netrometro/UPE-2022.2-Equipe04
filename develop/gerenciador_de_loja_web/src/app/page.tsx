'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { HeaderPage } from "../../components/header";
import { Teste } from "../../components/teste";
import { padding } from '@mui/system';

export default function Home() {
  return (

  <>   
    <HeaderPage /> 

    <div className='home-div'>
      <Button variant="contained" size="large">
          Entrar
      </Button>
    </div>
  </>

  )
}

