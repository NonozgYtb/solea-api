type GeoLocation = `GP:${number},${number}` // GP:<lat>,<lng>
type AdresseLocation = `AD:${string}` // AD:<geoid>
type POILocation = `LI:${number}` // POI:<geoid>
type ArretLocation = `AR:${string}` // AR:<id>
type ItineraireLocation =
  | GeoLocation
  | AdresseLocation
  | POILocation
  | ArretLocation

export type ItineraireParams = {
  depart: ItineraireLocation
  arrivee: ItineraireLocation
  type: 'from' | 'to'
  accessible?: true
  malvoyant?: true
  date: `${number}/${number}/${number}` // Format DD/MM/YYYY
  h: number
  m: number
}
