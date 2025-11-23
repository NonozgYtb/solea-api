/**
 * Object with :
 * - key : internal code
 * - value : stop name
 */
export type Liaison = Record<string, string>

export type Liaisons = {
  Aller: Liaison
  Retour: Liaison
}

export type TADZone = {
  tousarrets: boolean
  libelle: string
  'tad-id': number
  from_version: string
  to_version: string
  contenu_statique: string
  heure_min: string
  heure_max: string
  image: string
  arret: any
  sae: any
  liaisons: Liaisons
  texte: string
  texte_reduit: string
}
