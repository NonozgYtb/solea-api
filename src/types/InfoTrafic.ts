export interface InfoTraficImpact {
  id: number
  arret: string
  arret_libelle: string
  ligne: string
  ligne_libelle: string
  sae: number|null
  direction: string|null
  poteau_supprime: boolean
}

export interface InfoTrafic {
  id: number
  alerte: boolean
  titre: string
  accroche: string
  contenu: string // HTML Escaped
  rubriqueOrdre: number
  rubrique: string
  dateDebut: string
  dateFin: string
  dateDebutPublication: string
  dateFinPublication: string
  fichier: any
  impacts: InfoTraficImpact[]
}
