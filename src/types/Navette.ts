export interface NavettePoint {
  lat: number
  lng: number
}

export interface NavettePath {
  success: boolean
  id: number
  libelle: string
  message: string | null
  data: NavettePoint[]
}

export interface NavettePosition {
  id: string
  lng: number
  lat: number
  tmstp: number
  old?: boolean
}

export type NavetteSocketData = {
  [id: string]: NavettePosition
}
