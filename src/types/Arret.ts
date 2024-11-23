type OtherServices<T extends 'FILEA' | 'CHRONOPRO'> = {
  filea_type: T
  libelle: string
  url: string
}

export type Filea = OtherServices<'FILEA'>
export type Chronopro = OtherServices<'CHRONOPRO'>

export interface ArretLigne {
  sae: number
  direction: string
  ligne: string
  accessible_m: string
  accessible_v: string
  code: string
}

export interface Arret {
  nom: string
  lat: number
  lng: number
  codes: string[] // Internal code for poles attached to this stop
  filea: Filea[] // Filea services for this stop
  chronopro: Chronopro[] // Chronopro services for this stop
  lignes: ArretLigne[] // Lines passing through this stop (one per line direction)
}
