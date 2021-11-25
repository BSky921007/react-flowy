import './Protocol.css';

import React, { useState, useMemo, useContext, useEffect, useRef, Suspense } from 'react'

import {
  Heading,
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Tag,
  TagLabel,
  Badge,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Portal,
  Spinner,
} from '@chakra-ui/react'

import {  ArrowForwardIcon } from '@chakra-ui/icons'
import { FocusableElement, } from '@chakra-ui/utils'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/react'

import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { useParams } from 'react-router-dom'

import { BlobProvider } from '@react-pdf/renderer'

import useLocalstorageState from './client/use-localstorage-state'

import BareLayout from './BareLayout'

import { Icon, Database, Pathway, Evidence, 
  DbProvider, PathwayThemeProvider } from '@pathwaymd/pathway-ui2'

import untypedCollectedDb from './data/parsed.test.json'
const collectedDb = (untypedCollectedDb.objects as unknown) as Database;

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

const ProtocolReport = dynamic(() => import('./components/ProtocolReport'), {
  ssr: false,
})

const PageContext = React.createContext({})

/*function EvidenceReviewDrawer({ evidence }) {
  const { assessments, setEvidence } = useContext(PageContext)

  return (
    <Drawer
      isOpen={evidence !== null}
      placement="right"
      onClose={() => setEvidence(null)}
      size="md"
    >
      <DrawerOverlay zIndex={2}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Evidence Review</DrawerHeader>

          <DrawerBody>
            {evidence !== null && (
              <Evidence
                recommendation={evidence.recommendation}
                grading={evidence.grading}
                assessments={assessments}
                onOpenUrl={(url) => window.open(url, '_blank')}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
}*/

function PathwayStateBadge(pathwayState: any) {
  if (pathwayState && pathwayState.isComplete) {
    return (
      <Badge variant="solid" colorScheme="green" mb="0.5rem">
        Complete
      </Badge>
    )
  }

  if (pathwayState && !pathwayState.isComplete) {
    return (
      <Badge variant="outline" colorScheme="green" mb="0.5rem">
        In progress
      </Badge>
    )
  }

  return (
    <Badge variant="solid" colorScheme="green" mb="0.5rem" visibility="hidden">
      Todo
    </Badge>
  )
}

function ResetDialog({
  openState,
  onReset,
}: {
  openState: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  onReset: () => void
}) {
  const [isOpen, setIsOpen] = openState
  const cancel = () => setIsOpen(false)
  const cancelRef = useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={cancel}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          Reset Pathway
        </AlertDialogHeader>

        <AlertDialogBody>
          Are you sure? You can't undo this action afterwards.
        </AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={cancel}>
            Cancel
          </Button>

          <Button
            colorScheme="red"
            onClick={() => {
              setIsOpen(false)
              onReset()
            }}
            ml={3}
          >
            Reset
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
/*
function SignButton({ pathwayState: any, protocol: any, pathway: any } : { }) {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const inputRef = React.useRef(null)

  const [name, setName] = useLocalstorageState('', 'sign_name')

  const isSignDisabled = !pathwayState?.isComplete
  const isConfirmDisabled = name.length <= 2

  const [signed, setSigned] = useState<boolean>(false)

  return (
    <>
      {signed && (
        <>
          <Portal>
            <Box
              position="fixed"
              zIndex={999}
              top={0}
              right={0}
              bottom={0}
              left={0}
              bg="rgba(255, 255, 255, 0.85)"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ProtocolReport
                patientId="MCA9298BD"
                signName={name}
                date={new Date()}
                protocol={protocol}
                api={api}
                pathway={pathway}
                pathwayState={pathwayState.visibleSerialized}
              >
                {({ blob, url, loading, error }) => {
                  if (url) {
                    // disgusting. but it's 4:35 AM
                    window.location.href = url
                  } else if (error) {
                    return (
                      <Text>
                        Something went wrong.{' '}
                        <a href="#" onClick={() => setSigned(false)}>
                          Close
                        </a>
                      </Text>
                    )
                  } else {
                    return <Spinner size="xl" zIndex={9999} />
                  }
                }}
              </ProtocolReport>
            </Box>
          </Portal>
        </>
      )}

      <Popover
        placement="auto-end"
        closeOnBlur={true}
        isOpen={isOpen}
        initialFocusRef={inputRef}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <Button colorScheme="green" isDisabled={isSignDisabled}>
            Sign
          </Button>
        </PopoverTrigger>

        <PopoverContent background="white" zIndex={1}>
          <PopoverHeader fontWeight="semibold">Generate Report</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel htmlFor="sign_name">Full name</FormLabel>
                <Input
                  ref={inputRef}
                  id="sign_name"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={name}
                />
              </FormControl>
            </Stack>
          </PopoverBody>

          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>

              <Button
                colorScheme="green"
                isDisabled={isConfirmDisabled}
                onClick={() => setSigned(true)}
              >
                Confirm
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  )
}*/

export default function Protocol() {

  const { protocolId } = useParams()

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

  const pathwayId = protocol.pathways[0].id

  //const assessments = api.Assessment.elements

  /*const pathway = useMemo(
    () => api.Pathway.elements.find((pathway) => pathway.id === pathwayId),
    [pathwayId],
  )
  */

  const [evidence, setEvidence] = useState(null)

  // useEffect(() => {
  //   if (typeof window === 'undefined') return
  //   window.api = api
  // }, [])

  const storageKey = `protocol-v10-${protocol.id}-autosaved`

  const [autosaved, setAutosaved] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      setAutosaved(JSON.parse(localStorage.getItem(storageKey) ?? ''))
    } catch (err) {}

    setLoaded(true)
  }, [])

  const save = (pathwayState: any) => {
    const value = { ...(autosaved ?? {}), [pathwayId]: pathwayState }
    localStorage.setItem(storageKey, JSON.stringify(value))
    //setAutosaved(value)
  }
  
  // const save = throttle((pathwayState) => {
  //   const value = { ...(autosaved ?? {}), [pathwayId]: pathwayState }
  //   localStorage.setItem(storageKey, JSON.stringify(value))
  //   setAutosaved(value)
  // }, 1000)

  const [lastResetTime, setLastResetTime] = useState(Date.now())

  const reset = () => {
    save(null)
    setLastResetTime(Date.now())
  }

  const resetDialogOpenState = useState(false)
  const [isResetDialogOpen, setResetDialogOpen] = resetDialogOpenState

  const pageContextValue = useMemo(() => {
    return {
      protocol,
      pathwayId,
      setEvidence,
      autosaved,
    }
  }, [pathwayId])

  return (
    <BareLayout>
    <ThemeProvider theme={customTheme}>
      <CSSReset />

    
    <PageContext.Provider value={pageContextValue}>
      <ResetDialog openState={resetDialogOpenState} onReset={reset} />

      <Box
        position="sticky"
        top="0"
        zIndex={1}
        left="0"
        borderBottom="1px"
        borderColor="gray.200"
        bg="white"
        py="1.5rem"
        mt="-1.5rem"
      >
        {/* <ProtocolBreadcrumbs /> */}

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <Heading as="h1" size="lg">
              {protocol.name}
            </Heading>

          </Stack>

          <Stack direction="row">
            <Box display="flex" alignItems="center">
              <Text>
                Patient ID: <b>MCA9298BD</b>
              </Text>
            </Box>

            <Button
              colorScheme="gray"
              variant="ghost"
              onClick={() => setResetDialogOpen(true)}
              visibility={autosaved?.[pathwayId] ? 'visible' : 'hidden'}
            >
              Reset
            </Button>

            {/*<SignButton
              pathwayState={autosaved?.[pathwayId]}
              protocol={protocol}
              pathway={pathway}
            />*/}
          </Stack>
        </Stack>

        <Box h="1rem" />

        <Box overflowX="auto" overflowY="hidden" whiteSpace="nowrap">
          {protocol.pathways.map((pathway: any, i: number) => (
            <Box
              key={pathway.id}
              display="inline-flex"
              ml={i > 0 ? '0.5rem' : '0'}
            >
              <Box>
                <PathwayStateBadge pathwayState={autosaved?.[pathway.id]} />

                <NextLink
                  href="/protocols/[protocolId]/pathways/[pathwayId]"
                  as={`/protocols/${protocol.id}/pathways/${pathway.id}`}
                  passHref
                  prefetch={false}
                >
                  <Button
                    as="a"
                    display="flex"
                    colorScheme="pathway"
                    size="sm"
                    variant={pathway.id === pathwayId ? 'solid' : 'outline'}
                    color={pathway.id === pathwayId ? 'white' : 'pathway.400'}
                    justifyContent="space-between"
                    py="0.75rem"
                    rightIcon={<ArrowForwardIcon />}
                    height="auto"
                    width="24rem"
                    whiteSpace="normal"
                  >
                    <Box>
                      <Text display="block" fontWeight="normal">
                        Pathway #{i + 1}
                      </Text>
                      <Heading
                        as="h3"
                        display="block"
                        fontSize="md"
                        mt="0.15em"
                      >
                        {pathway.name}
                      </Heading>
                    </Box>
                  </Button>
                </NextLink>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box h="2rem" />

      <Box maxWidth="40em" mx="auto">
        {loaded ? (
          <PathwayThemeProvider>
            <DbProvider db={collectedDb}>
              <Suspense fallback={null}>
              { pathwayId && <Pathway pathwayId={pathwayId} onAssessmentClick={(data: any) => {}} />}
              </Suspense>
            </DbProvider>
          </PathwayThemeProvider>
        ) : (
          <Text>'Loading'</Text>
        )}
      </Box>
      {/*<Pathway
            pathwayId={}
            key={`${pathwayId}-${lastResetTime}`}
            pathway={pathway}
            maxNodes={Infinity}
            onAssessmentClick={(evidence) => setEvidence(evidence)}
            followDefaultPath={false}
            initial={autosaved?.[pathwayId]?.serialized ?? null}
            onChange={({ serialized, visibleSerialized, isComplete }) =>
              save({ serialized, visibleSerialized, isComplete })
            }
          />*/}
    </PageContext.Provider>
    </ThemeProvider>
    </BareLayout>
  )
}