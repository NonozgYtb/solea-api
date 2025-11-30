import { Ligne, LignePdf } from './Ligne'

export type LigneDetailsLigne = Omit<Ligne, 'pdfs_hiver' | 'pdfs_ete'>

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
  ligne: LigneDetailsLigne
  horaires: Horaire[]
  directions: string[]
  thermometre: string
  arrets: Record<`${number}`, LigneDetailsArret>
  pdfs_hiver: LignePdf[]
  pdfs_ete: LignePdf[]
  pdf_hivers: string
  pdf_ete: string
}
