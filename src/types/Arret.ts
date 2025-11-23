export type TAD = {
  libelle: string
  url: string
  picto_fiche: string
  /**
   * Currently null or "20 minutes", "15 minutes" or "1h"
   */
  frequence?: null|number
  /**
   * Currently TAD, CHRONOPRO or TAD_HZ
   */
  filea_type: string|null
}
/**
 * Not used currently
 */
export type Chronopro = never

export interface ArretLigne {
  sae: number
  direction: string
  ligne: string
  code: string
}

export interface Arret {
  nom: string
  lat: number
  lng: number
  /**
   * Internal code for poles attached to this stop
   */
  codes: string[]
  /**
   * TAD Services for this stop
   */
  filea: TAD[]
  /**
   * Not used currently
   */
  chronopro: Chronopro[]
  /**
   * Lines passing by this stop (one per line direction)
   */
  lignes: ArretLigne[]
}
