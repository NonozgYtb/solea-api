export interface NavettePos {
  lat: number
  lng: number
}

export interface NavetteData {
  success: boolean
  id: number
  libelle: string
  message: string | null
  data: NavettePos[]
}
