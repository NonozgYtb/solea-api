export interface Summary {
  type: string
  temps: number
  dep_time: number
  ligne_svg: string
  filea_type: string
  tad_zone?: string|null
}

export interface Iti {
  h: string
  heure: string
  arret: string
  dir: string
  dir_name: string
  icon: string
  action: string
  travaux: string
  travaux_url: string
  alerte_id?: number|null
  label: string
  filea_url: string
  filea_type: string
  ligne_svg: string
  ligne: string
  sae?: string | null
  src: string
}
export interface Itineraire {
  status: string
  hdepmin: number
  hdep: string
  harr: string
  harrivee: string
  temps_total: number
  temps_total_h: string
  emission_co2: number
  correspondance: number
  has_alerte: boolean
  has_filea: boolean
  geo: string
  start_geo: number[]
  end_geo: number[]
  summary: Summary[]
  temps_marche: number
  distance_marche: number
  iti: Iti[]
}

export interface ItineraireResult {
  status: string
  results: Itineraire[]
  msg: string
  nb_result: number
}
