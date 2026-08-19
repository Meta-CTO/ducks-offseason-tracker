import { useEditorial } from '../lib/editorial'
import SiteFooter from './SiteFooter'

/** The footer for a club with a written brief: its cited sources. */
export default function Sources() {
  const { sources, LAST_UPDATED } = useEditorial()
  return (
    <SiteFooter
      sources={sources}
      updated={LAST_UPDATED}
      caveat={
        'Statistics, transactions and contract terms are facts compiled from ' +
        'the sources below: official club/NHL releases first, then NHL.com ' +
        'editorial for lineup projections, PuckPedia (timestamped) for cap and ' +
        'contract data, and Hockey-Reference for season totals. Every ' +
        '“projected” lineup remains a projection until the official ' +
        'opening-night roster is announced.'
      }
    />
  )
}
