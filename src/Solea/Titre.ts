export interface TitresTransport {
  titre: string
  prix_a_partir: string
  image: string
  url: string
  description: string
}

export interface Titre {
  id: number
  root_id: number
  key: string
  lft: number
  rgt: number
  level: number
  nom: string
  description: any
  meta_title: string
  meta_keywords: string
  meta_description: string
  titres_transport: TitresTransport[]
}
