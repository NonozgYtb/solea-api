type HexColor = `#${string}`

export type LignePdf = {
  libelle: string
  url: string
}

export type Ligne = {
  id: number
  tri: number
  /**
   * Code interne de la ligne (par exemple "94", "C6", "13")
   */
  code: string
  /**
   * Numéro public de la ligne (par exemple "1", "TT", "C6", "13")
   */
  code_bdsi: string
  /**
   * Numéro public de la ligne (par exemple "1", "TT", "C6", "13")
   */
  code_hastop: string
  name: string
  type: 'Tram' | 'Bus'
  /**
   * Destination en HTML (Stop1 <-> Stop2)
   */
  destination: string
  /**
   * Destination en texte (Stop1 <-> Stop2)
   */
  destination_texte: string
  /**
   * Couleur hexadécimale de la ligne
   */
  color: HexColor
  /**
   * Tableau de couleurs (normalement une seule, identique à `color`)
   */
  colors: [HexColor]
  /**
   * Icône de la ligne en SVG inline
   */
  svg: string
  /**
   * Logo width (8 for tram, 4 for bus)
   */
  size: 8 | 4
  /**
   * `semaine`, `soir`, `dimanches et jours fériés`
   */
  reseaux: string[]
  /**
   * Identique à `reseaux` mais au format texte (séparé par ", ")
   */
  reseau: string
  /**
   * Accessible aux personnes à mobilité réduite
   */
  /**
   * Service Chronopro
   */
  chronopro: boolean
  thermometre?: string
  /**
   * Accessible aux personnes à mobilité réduite
   */
  accessibleM: boolean
  /**
   * Liens des pdfs hiver
   */
  pdfs_hiver: LignePdf[]
  /**
   * Liens des pdfs été
   */
  pdfs_ete: LignePdf[]
  /**
   * Internal line id
   */
  lignes: [number]
  only_iti: '0'|'1'
}
