'use client';
import type { NextPage } from 'next'
import Head from 'next/head'
import * as React from 'react';
import LoginForm from '../../components/login-form'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { HeaderPage } from "../../components/header";
import { Teste } from "../../components/teste";
import { padding } from '@mui/system';

export default function Home() {
  return (

  <>   
    <HeaderPage /> 

    <div>
      <Head>
        <title>Entrar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LoginForm/>
      </main>
    </div>

  </>

  )
}

