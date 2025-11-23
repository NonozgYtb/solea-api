export interface InfoTraficImpact {
  id: number
  arret: string
  arret_libelle: string
  ligne: string
  ligne_libelle: string
  sae: number | null
  direction: string | null
  poteau_supprime: boolean
}

export type InfoTraficLigneImpactee = {
  code: string
  libelle: string
  svg: string
}

export interface InfoTrafic {
  id: number
  alerte: boolean
  titre: string
  accroche: string
  /**
   * HTML escaped content
   */
  contenu: string
  rubriqueOrdre: number
  rubrique: string
  dateDebut: string
  dateFin: string
  dateDebutPublication: string
  dateFinPublication: string
  /**
   * Base URL: https://admin.solea.info/
   */
  fichier: null | string
  impacts: InfoTraficImpact[]
  lignes_impactees: Record<string, InfoTraficLigneImpactee>
}
