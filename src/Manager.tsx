import React, { useState, useMemo, useContext, useEffect, useRef, Suspense } from 'react'

import { View } from 'react-native';
import { Box, Text } from '@chakra-ui/react'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/react'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { useParams } from 'react-router-dom'
import useLocalstorageState from './client/use-localstorage-state'

import BareLayout from './BareLayout'

const customTheme = {
  ...theme,
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  colors: {
    ...theme.colors,
    pathway: {
      50: '#e6f2ff',
      100: '#c1d3f3',
      200: '#9bb3e6',
      300: '#7390d9',
      400: '#4c6dcc',
      500: '#335cb3',
      600: '#264f8c',
      700: '#1a3d65',
      800: '#0d2940',
      900: '#02111b',
    },
  },
}

const PageContext = React.createContext({})

export default function Manager() {

  const { patientId } = useParams()

  const patientInfo = {
      id: '53325534',
      firstName: 'Louis',
      lastName: 'Mullie',
      phoneNumber: '514-235-3872',
      dateOfBirth: '07/07/1991',
      age: '30 years old',
      sex: 'male',
      nextAppointment: '03/02/2022'
  }

  const protocol = {
    id: 'acute-appendicitis',
    name: 'Acute appendicitis',
    pathways: [
      { id: 'recXTk08zFJaYRb0m', name: 'Emergency room evaluation' },
      { id: 'recVgF9M7WjQB6hZq', name: 'As needed medications' },
      { id: 'recrYanGocrkXIF8C', name: 'Antibiotic treatment' },
      { id: 'recEYsUbey3PbAIlY', name: 'Nonoperative management' },
      { id: 'recOSd2rC7DAa1kSf', name: 'Operative management' },
      {
        id: 'recooGtEyv9gxW85e',
        name: 'Preoperative orders',
      },
      { id: 'reco0mAGEFY2WNfq4', name: 'Postoperative orders' },
      { id: 'recL7F1EUkhCA5kCw', name: 'Postoperative follow-up' },
      { id: 'recZ5grhMnqaMZIMx', name: 'Hospital discharge' },
    ],
  }

  const bundles = [
    { id: '123', name: 'Screening for dyslipidemia',
      status: 'eligible', lastStatusChange: '01/01/2021',
      completed: 'never', expiryDate: '' },
    { id: '124', name: 'Screening for diabetes',
      status: 'eligible', lastStatusChange: '01/01/2021',
      completed: 'never', expiryDate: '' },
    { id: '125', name: 'Screening for obesity',
      status: 'completed', lastStatusChange: '01/01/2020',
      completed: 'yes', expiryDate: '01/01/2021' },
    { id: '126', name: 'Screening for dyslipidemia',
      status: 'completed', lastStatusChange: '01/01/2021',
      completed: 'never', expiryDate: 'in 2 months' },
    { id: '127', name: 'Screening for colon cancer',
      status: 'ineligible', lastStatusChange: '01/07/2019',
      completed: 'never', expiryDate: '' },
    { id: '128', name: 'Screening for ovarian cancer',
      status: 'ineligible', lastStatusChange: '01/07/2019',
      completed: 'never', expiryDate: '' },
    { id: '129', name: 'First visit intake',
      status: 'completed', lastStatusChange: '01/07/2019',
      completed: '01/07/2019', expiryDate: 'never' },
  ]

  const [autosaved, setAutosaved] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const pageContextValue = useMemo(() => {
    return {
      protocol
    }
  }, [protocol])

  return (
      <BareLayout>
        <ThemeProvider theme={customTheme}>
        <CSSReset />
            <PageContext.Provider value={pageContextValue}>
            <Box display="flex" m={10}>
                <Box mt="4"><Text>Care manager</Text></Box>
                <Box mt="4" display="flex" align="right">
                    <Box><Text>Patient ID:&nbsp;</Text></Box> 
                    <Box><Text>{patientInfo.id}</Text></Box> 
                </Box>
            </Box>
            <Box>
                <Box display="flex">
                    <Box><Text>First name:&nbsp;</Text></Box> 
                    <Box><Text>{patientInfo.firstName}</Text></Box> 
                </Box>
                <Box display="flex">
                    <Box><Text>Last name:&nbsp;</Text></Box> 
                    <Box><Text>{patientInfo.lastName}</Text></Box> 
                </Box>
                <Box display="flex">
                    <Box><Text>Date of birth:&nbsp;</Text></Box> 
                    <Box><Text>{patientInfo.dateOfBirth}</Text></Box> 
                </Box>
                <Box display="flex">
                    <Box><Text>Age:&nbsp;</Text></Box> 
                    <Box><Text>{patientInfo.age}</Text></Box> 
                </Box>
            </Box>
            </PageContext.Provider>
        </ThemeProvider>
      </BareLayout>
  )
}

Manager.Layout = BareLayout