import { AdresseLocation } from './ItineraireParams'

export interface Adresse {
  source: string
  name: string
  lat: number
  lng: number
  ville: string
  geoid: AdresseLocation
}
