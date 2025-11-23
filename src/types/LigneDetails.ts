import { LignePdf } from './Ligne'

export interface Ligne {
  id: number
  code: string
  size: number
  name: string
  color: string
  type: string
  tri: number
  svg: string
  destination: string
  accessibleM: boolean
  code_bdsi: string
  code_hastop: string
  chronopro: boolean
  destination_texte: string
  colors: string[]
  reseau: string
  reseaux: string[]
  lignes: number[]
  only_iti: string
}

export interface Horaire {
  max_h: string
  min_h: string
  libelle: string
}

export type LigneDetailsArret = {
  nom: string
  nomCommercial: string | null
  lieuxReference: string | null
  lat: number
  lng: number
  icon: string
  code: string
  name: string
  geoid: string
}
export type LigneDetails = {
  ligne: Ligne
  horaires: Horaire[]
  directions: string[]
  thermometre: string
  arrets: Record<`${number}`, LigneDetailsArret>
  pdfs_hiver: LignePdf[]
  pdfs_ete: LignePdf[]
  pdf_hivers: string
  pdf_ete: string
}
