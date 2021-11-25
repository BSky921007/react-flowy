import React, { Suspense } from 'react'

import {
  DbProvider,
  Database,
  Pathway,
  PathwayThemeProvider,
} from '@pathwaymd/pathway-ui2'

import BareLayout from './BareLayout'
import { useParams } from 'react-router-dom'

import untypedCollectedDb from './data/collectedPathway.json'

const collectedDb = untypedCollectedDb as unknown as Database

export default function PathwayWrapper () {
  const { pathwayId } = useParams()
  // http://localhost:3000/pathways/recGqPfICnJVB1J3i
  return (
    <BareLayout>
      <PathwayThemeProvider>
        <DbProvider db={collectedDb}>
          <Suspense fallback={null}>
          { pathwayId && <Pathway pathwayId={pathwayId} onAssessmentClick={(data: any) => {}} />}
          </Suspense>
        </DbProvider>
      </PathwayThemeProvider>
    </BareLayout>
  )
}