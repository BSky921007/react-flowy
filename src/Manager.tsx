import React, { useState, useMemo, useContext, useEffect, useRef, Suspense } from 'react'
import { Heading, Button, Box, Text, Grid, VStack, Link, Image, Spacer } from '@chakra-ui/react'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/react'
import { useParams, Link as RouteLink } from 'react-router-dom'
import useLocalstorageState from './client/use-localstorage-state'
import {base_url} from './Globals';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react"

import {
  RepeatClockIcon,
  EditIcon,
  LinkIcon
} from '@chakra-ui/icons'

import BareLayout from './BareLayout'
import { Repeat } from '@mui/icons-material'

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
      phoneNumber: '5142353872',
      dateOfBirth: '07/07/1991',
      age: '30 years old',
      sex: 'male',
      notes: '"Screening for dyslipidemia" - L. Mullie (08331)',
      pronouns: 'he, him',
      city: 'Montréal, QC',
      postalCode: 'H4J2T1',
      address: '701 Atwater'
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

  const user = {
    name: 'Louis Mullie',
    title: 'MD',
    licenseNumber: '08331'
  }

  const bundles = [
    { id: '123', name: 'Screening for dyslipidemia',
      status: 'eligible', lastStatusChange: '01/01/2021',
      completed: 'never', expiryDate: '' },
    { id: '124', name: 'Screening for diabetes',
      status: 'eligible', lastStatusChange: '01/01/2021',
      completed: 'never', expiryDate: '' },
    { id: '125', name: 'Screening for obesity',
      status: 'inProgress', lastStatusChange: '01/01/2020',
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

  const statusGroups = [
    { name: 'eligible', title: 'Eligible bundles', color: '#d9e7fd'},
    { name: 'inProgress', title: 'In progress', color: '#ffe6cd' },
    { name: 'completed', title: 'Completed', color: '#d4e7d7' },
    { name: 'ineligible', title: 'Ineligible bundles', color: '#f5f5f5' },
  ]

  const [autosaved, setAutosaved] = useState(null)
  const [loaded, setLoaded] = useState(false)

  const pageContextValue = useMemo(() => {
    return {
      protocol
    }
  }, [protocol])

  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
      <BareLayout>
        <ThemeProvider theme={customTheme}>
        <CSSReset />
        <PageContext.Provider value={pageContextValue}>
        <VStack spacing="24px" height="100%" mt="4">
        <Grid templateColumns="repeat(2, 1fr)" gap={6} w="100%">
          <Box align="left" w="100%" display="flex">
            <Image src={`${base_url}/assets/logo_small.png`} alt="NO"/>
            <Heading as="h1" size="lg" ml="4">Care Manager</Heading>
          </Box>
          <Box w="100%"  verticalAlign="middle">
            <Box display="flex" float="right" mt="2">
              <Box><Text>User:&nbsp;</Text></Box> 
              <Box><Text>{user.name}, {user.title} ({user.licenseNumber})</Text></Box> 
            </Box>
          </Box>
        </Grid>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} width="100%">
          <Box w="100%">
            <Box display="flex" mb="4">
              <Box><Heading as="h2" size="md">Patient information</Heading></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">First name:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.firstName}</Text></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">Last name:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.lastName}</Text></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">Date of birth:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.dateOfBirth}</Text></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">Age:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.age}</Text></Box> 
            </Box>
          </Box>
          <Box w="100%" >
            <Box display="flex" mt="10">
              <Box><Text fontWeight="bold">Sex:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.sex}</Text></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">Phone:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.phoneNumber}</Text></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">Address:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.address}</Text></Box> 
            </Box>
            <Box display="flex">
              <Box><Text fontWeight="bold">City:&nbsp;</Text></Box> 
              <Box><Text>{patientInfo.city}</Text></Box> 
            </Box>
          </Box>
          <Box w="100%" >
            <Box display="flex" mb="4">
              <Box><Heading as="h2" size="md">Notes</Heading></Box> 
            </Box>
            <Text fontWeight="bold">Thursday, December 21st 2021</Text>
            <Box display="flex"><Text>{patientInfo.notes}</Text><LinkIcon mt="1" ml="1" color="#4c6dcc" /></Box> 
          </Box>
          <Box w="100%" >
            <Box display="flex" mb="4">
              <Box><Heading as="h2" size="md">Actions</Heading></Box> 
            </Box>
            <Box>
              <Button borderRadius="5" width="100%" height="10" leftIcon={<EditIcon/>}>
                <Text>Edit patient information</Text>
              </Button>
            </Box> 
            <Box mt="4">
              <Button borderRadius="5" width="100%" height="10" leftIcon={<RepeatClockIcon/>}>
                <Text>Select another patient</Text>
              </Button>
            </Box> 
          </Box>
          </Grid>
            <Grid templateColumns="repeat(4, 1fr)" gap={6} width="100%">
            {
              statusGroups.map((group) => {
                return <Box w="100%" h="10">
                  <Box>
                    <Box><Heading as="h2" size="md">{group.title}</Heading></Box> 
                  </Box>
                  <Box mt="4" mb="4">
                    {bundles.filter((b) => b.status == group.name).map((bundle) => {
                      return <Box h="40" p="4" mb="4" borderRadius="5" border="1px solid #4c6dcc;">                        
                        <Link onClick={onOpen}>
                        <Box mb="4"><Heading as="h3" size="sm" color="#4c6dcc">{bundle.name}</Heading></Box>
                        </Link>
                        <Box>
                          <Text fontSize="14px">
                          {bundle.status == 'completed' ? `Completed on ${bundle.lastStatusChange}. ` : ''}
                          {bundle.status == 'inProgress' ? `Started on ${bundle.lastStatusChange}. ` : ''}
                          {bundle.status == 'eligible' ? `Never completed. Eligible since ${bundle.lastStatusChange}. ` : ''}
                          {bundle.status == 'ineligible' ? `Not eligible. ` : ''}
                          {bundle.expiryDate ? (bundle.expiryDate == 'never' ? 'Never expires.' : `Expires ${bundle.expiryDate}. `) : ''}
                          </Text>
                        </Box>                        
                      </Box> 
                    })}
                  </Box>
                  <Text></Text>
                </Box>
              })
            }
            </Grid>
          </VStack>
          <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader mt="8">What would you like to do with this bundle?</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={8} align="center">
                <Box>
                  <RouteLink to="/bundles/recfTPwyzRqM3dk0I">
                    <Link>
                      <Button colorScheme="blue" mt={4} w={200} leftIcon={<EditIcon />}>
                        Work on it now
                      </Button>
                    </Link>
                  </RouteLink>
                </Box>
                <Box>
                  <Button colorScheme="orange" mt={4} w={200} leftIcon={<RepeatClockIcon />}>
                    Schedule for later
                  </Button>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Box position="absolute" bottom="75px" right="16px" width="266px" height="10px">
            <RouteLink to="/builder/recfTPwyzRqM3dk0I">
              <Link>
                <Button colorScheme="green" size="md" width="100%">
                  <Text>Open Protocol Editor</Text>
                </Button>
              </Link>
            </RouteLink>
          </Box>
        </PageContext.Provider>
      </ThemeProvider>
    </BareLayout>
  )
}

Manager.Layout = BareLayout