import React from 'react'

import {
  DbProvider,
  Database,
  Pathway,
  PathwayThemeProvider,
} from '@pathwaymd/pathway-ui2'

import untypedCollectedDb from '../data/collectedPathway.json'
const collectedDb = untypedCollectedDb as Database

const PathwayWrapper: React.FC<{ pathwayId: string }> = ({
  pathwayId,
}) => {
  // in real-life usage, collected db will be served by the api and will contain
  // exactly the pathway corresponding to pathwayId. because this is a demo,
  // we always render the only pathway we have in collectedPathway.json regardless
  // of what pathwayId is.
  pathwayId = collectedDb.pathways[0]!.id

  return (
    <PathwayThemeProvider>
      <DbProvider db={collectedDb}>
        <Pathway pathwayId={pathwayId} onAssessmentClick={(data: any) => {}} />
      </DbProvider>
    </PathwayThemeProvider>
  )
}

export default PathwayWrapper