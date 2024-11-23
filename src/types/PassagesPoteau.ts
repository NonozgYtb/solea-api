export interface PassagesInfo {
  premier: null | `${number}`
  dernier: null | `${number}`
}

export interface Passage {
  terminus: string
  h: number
  min: number
  temps_reel: 0 | 1
  id?: string
  cancel?: boolean
}

export interface PassagesPoteau {
  info: PassagesInfo
  passages: Passage[]
}
