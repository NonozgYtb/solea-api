type HexColor = `#${string}`

export type Ligne = {
  id: number
  tri: number
  only_iti: '0'
  code: string // Code interne de la ligne (par exemple "94", "C6", "13")
  code_bdsi: string // Numéro public de la ligne (par exemple "1", "TT", "C6", "13")
  code_hastop: string // Numéro public de la ligne (par exemple "1", "TT", "C6", "13")
  name: string
  type: 'Tram' | 'Bus'
  destination: string // Destination en HTML (Stop1 <-> Stop2)
  destination_texte: string // Destination en texte (Stop1 <-> Stop2)
  color: HexColor // Couleur hexadécimale de la ligne
  colors: [HexColor] // Tableau de couleurs (normalement une seule, identique à `color`)
  svg: string // Icône de la ligne en SVG inline
  size: 8 | 4 // Taille de l'icône de la ligne
  reseau: string // Identique à `reseaux` mais au format texte (séparé par ", ")
  reseaux: ('semaine' | 'soir' | 'dimanches et jours fériés')[]
  accessibleM: boolean // Accessible aux personnes à mobilité réduite
  chronopro: boolean // Service Chronopro
  lignes: [number] // Contenant le code interne de la ligne
}
