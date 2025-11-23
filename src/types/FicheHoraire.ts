export type FicheHoraire = {
  info: {
    arretNom: string
    ligneNom: string
    direction: string
    validite: string
    periodeId: number
    ficheId: number
    fiche: string
  }
  horaires: {
    libelle: string
    couleurs: {
      /**
       * Format : `rbg(123,45,67)`
       */
      colorperiode: string
      /**
       * Format : `rbg(123,45,67)`
       */
      colortext: string
    }
    horaire: Record<`${number}`, { m: number; note: string | null }>
  }[]
  notes: {
    [note: string]: string
  }
}
export type FicheHoraireInitial = {
  [key: string]: FicheHoraire // why ???
}
