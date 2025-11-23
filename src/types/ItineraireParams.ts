export type GeoLocation = `GP:${number | string},${number | string}` // GP:<lat>,<lng>
export type AdresseLocation = `AD:${string}` // AD:<geoid>
export type POILocation = `LI:${number | string}` // POI:<geoid>
export type ArretLocation = `AR:${string}` // AR:<id>
export type ItineraireLocation =
  | GeoLocation
  | AdresseLocation
  | POILocation
  | ArretLocation

export type DDMMYYYY = `${number | string}/${number | string}/${
  | number
  | string}`

export type ItineraireParams = {
  depart: ItineraireLocation
  arrive: ItineraireLocation
  type: 'from' | 'to'
  accessible?: boolean
  malvoyant?: boolean
  date: DDMMYYYY // Format DD/MM/YYYY
  h: number
  mn: number
}
