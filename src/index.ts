import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { Arret } from './types/Arret'
import { Ligne } from './types/Ligne'
import { Titre } from './types/Titre'
import { POI } from './types/POI'
import { Adresse } from './types/Adresse'
import { ItineraireResult } from './types/ItineraireResult'
import { ItineraireParams } from './types/ItineraireParams'
import qs from 'qs'
import { InfoTrafic } from './types/InfoTrafic'
import { PassagesPoteau } from './types/PassagesPoteau'
import { NavettePath } from './types/Navette'
import { LigneDetails } from './types/LigneDetails'
import { FicheHoraireInitial } from './types/FicheHoraire'

/**
 * Solea-API
 *
 * Ce module permet de récupérer entre autre :
 * - les prochains passages
 * - les lignes
 * - les arrêts
 * - le calcul d'itinéraire
 * - le trajet de la navette du centre-ville de Mulhouse
 *
 * **Note :** La position de la navette n'est accessible que via un socket (non websocket) et n'est pas (et ne sera pas) implémentée.
 * Cependant, une petite doc est disponible pour l'implémentation de cette fonctionnalité. (voir [ici]())
 * ***
 *
 * &copy; 2025 NonozgYtb
 *
 * *Avec l'aide et en reprenant la structure d'un projet de : [Maël Gangloff](https://github.com/maelgangloff)*
 *
 * @see https://github.com/NonozgYtb/solea-api
 */
export class Solea {
  /**
   * Lister les arrets du réseau de transport, avec les lignes qui y passent
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getArrets().then(arrets => console.log(arrets))
   * ```
   * @returns {Promise<Arret[]>} Une liste contenant les arrets du réseau
   */
  public static async getArrets() {
    return this.effectRequest<Arret[]>({
      url: '/api/arretsconcise_sens'
    })
  }

  /**
   * Lister les lignes du réseau de transport
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getLignes().then(lignes => console.log(lignes))
   * ```
   * @returns {Promise<Ligne[]>} Une liste contenant les lignes du réseau
   */
  public static async getLignes() {
    return this.effectRequest<Ligne[]>({ url: '/api/lignes/' })
  }

  /**
   * Récupérer une ligne du réseau de transport
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getLigne("").then(ligne => console.log(ligne))
   * ```
   * @returns {Promise<LigneDetails[]>} Une liste contenant les lignes du réseau
   */
  public static async getLigne(code: string) {
    return this.effectRequest<LigneDetails | []>({ url: `/api/lignes/${code}` })
  }

  /**
   * Récupérer la fiche horaire d'un arrêt en fonction d'une ligne
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getFicheHoraire(271, "C5")
   *     .then(fiche => console.log(fiche))
   * ```
   * Les Champs ìdPoteau et idLigne sont disponibles à partir de `getArrets`.
   *
   * Pour chaque `lignes` de `getArrets` :
   *   - `idPoteau` correspond à `sae`
   *   - `idLigne` correspond à `ligne`
   *
   * @param idPoteauSae L'identifiant de l'arrêt
   * @param idLigne L'identifiant de la ligne
   * @returns {Promise<FicheHoraireInitial>} La fiche horaire de l'arrêt
   */
  public static async getFicheHoraire(idPoteauSae: number, idLigne: string) {
    return this.effectRequest<FicheHoraireInitial>({
      url: `v3/reseau/poteau/${idPoteauSae}/${idLigne}/fiche-horaire`
    })
  }

  /**
   * Récupérer les prochains passages à un arrêt en fonction d'une ligne
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getPassages(271, "C5")
   *     .then(passages => console.log(passages))
   * ```
   * Les Champs ìdPoteau et idLigne sont disponibles à partir de `getArrets`.
   *
   * Pour chaque `lignes` de `getArrets` :
   *   - `idPoteau` correspond à `sae`
   *   - `idLigne` correspond à `ligne`
   *
   * @param idPoteauSae L'identifiant de l'arrêt
   * @param idLigne L'identifiant de la ligne
   * @returns {Promise<PassagesPoteau>} Les prochains passages à l'arrêt
   */
  public static async getPassages(idPoteauSae: number, idLigne: string) {
    return this.effectRequest<PassagesPoteau>({
      url: `v3/reseau/poteau/${idPoteauSae}/${idLigne}/reel/all`
    })
  }

  /**
   *
   * Récupère le picto d'une ligne
   *
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getLignePicto("C4")
   *  .then(rawdata => fs.writeFileSync('C4.png', Buffer.from(rawdata, 'base64')))
   * ```
   *
   * @param idLigne L'identifiant technique de la ligne (ex: "C5", "94", "14")
   * @returns {Promise<string>} Le picto de la ligne en PNG (format texte base64)
   */
  public static async getLignePicto(idLigne: string, size = 96) {
    return this.effectRequest<string>({
      url: `/api/ligne/${idLigne}/convertpicto/${size}`,
      responseType: 'text',
      responseEncoding: 'base64'
    })
  }

  /**
   *
   * Récupère les informations d'une zone TAD
   *
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getTADZone(106)
   *  .then(rawdata => console.log(rawdata))
   * ```
   *
   * @param idTADZone L'identifiant technique de la zone TAD (ex: 1, 106)
   * @returns {Promise<string>} Le picto de la ligne en PNG (format texte base64)
   */
  public static async getTADZone(idTADZone: number) {
    return this.effectRequest<string>({
      url: `/api/tadzone/${idTADZone}`
    })
  }

  /**
   *
   * Récupère le picto d'une zone TAD
   *
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getTADZonePicto(106, 96)
   *  .then(rawdata => fs.writeFileSync('106.png', Buffer.from(rawdata, 'base64')))
   * ```
   *
   * @param idTADZone L'identifiant technique de la zone TAD (ex: 1, 106)
   * @returns {Promise<string>} Le picto de la ligne en PNG (format texte base64)
   */
  public static async getTADZonePicto(idTADZone: number, size = 96) {
    return this.effectRequest<string>({
      url: `/api/tadzone/${idTADZone}/convertpicto/${size}`,
      responseType: 'text',
      responseEncoding: 'base64'
    })
  }

  /**
   * Récupère les infos trafic impactants actuellement du réseau
   *
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getInfosTrafic().then((infos)=>console.log(infos))
   * ```
   *
   * @returns {Promise<InfoTrafic[]>} Les informations trafic
   */
  public static async getInfosTrafic() {
    return this.effectRequest<InfoTrafic[]>({
      url: '/api/infos_trafic'
    })
  }

  /**
   * Récupère les titres de transport disponibles
   *
   * @param {'tickets' | 'abonnements' | 'both'} type Le type de titre à récupérer ('tickets', 'abonnements' ou 'both')
   *
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getTitres('tickets').then((tickets)=>console.log(tickets))
   * ```
   *
   * @returns {Promise<Titre[]>} Les titres de transport
   */
  public static async getTitres(
    type: 'tickets' | 'abonnements' | 'both' = 'both'
  ): Promise<Titre[]> {
    if (type === 'both') {
      return Promise.all([
        this.getTitres('tickets'),
        this.getTitres('abonnements')
      ]).then(([tickets, abonnements]) => [...tickets, ...abonnements])
    }
    if (type !== 'tickets' && type !== 'abonnements') {
      throw new Error('Solea - Invalid "titre" type')
    }
    return this.effectRequest({ url: `/v1/reseau/titres/${type}` })
  }

  /**
   * Récupère les POI (Points d'Intérêt) à partir d'une recherche
   *
   * @param query La recherche à effectuer
   * @returns {Promise<POI[]>} Les points d'intérêt
   */
  public static async searchPOI(query: string) {
    return this.effectRequest<POI[]>({
      url: '/geo/search/poi',
      params: { query }
    })
  }

  /**
   * Liste tous les POI (Points d'Intérêt)
   *
   * @returns {Promise<POI[]>} Les points d'intérêt
   */
  public static async listPOI() {
    return this.effectRequest<POI[]>({ url: '/v1/geo/poi' })
  }

  /**
   * Récupère les adresses à partir d'une recherche
   * @param query La recherche à effectuer
   *
   * @returns {Promise<Adresse[]>} Les adresses
   */
  public static async searchAddress(query: string) {
    return this.effectRequest<Adresse[]>({
      url: '/v1/geo/search/adresse',
      params: { query }
    })
  }

  /**
   * Liste toutes les adresses
   * @param itineraireParams Les paramètres de l'itinéraire
   *
   * @returns {Promise<ItineraireResult>} Les itinéraires
   */
  public static async searchItineraire(itineraireParams: ItineraireParams) {
    return this.effectRequest<ItineraireResult>({
      url: '/v1/geo/calcule/itimobi',
      method: 'POST',
      data: qs.stringify(itineraireParams)
    })
  }

  /**
   * Récupère le tracé de la navette de Mulhouse en temps réel
   * @example ```js
   * const { Solea } = require('@nonozgytb/solea-api')
   *
   * Solea.getNavettePath().then((navette)=>console.log("Le tracé actuel en point GPS de la navette :",navette.data))
   * ```
   * @returns {Promise<NavettePath>} Les données de la navette
   */
  public static async getNavettePath() {
    return Axios.request<NavettePath>({
      url: 'http://lanavette.mulhouse.fr/api'
    })
  }

  // TODO : Utiliser le socket de la navette pour obtenir la position des véhicules.

  protected static baseParams = {
    baseURL: 'https://api.solea.info/',
    headers: {
      'User-Agent': 'Solea/Android',
      Authorization: `Basic ${((a) =>
        a('VnQ=dE1zb2xGbGVTbmEyZXg6YXJ0bGVub2JpZWFtc29s')
          .match(/.{1,4}/g)
          ?.map(a)
          .join(''))((e: string) => [...e].reverse().join(''))}`
    },
    timeout: 30 * 1000 // sometime the API is slow (especially when we calculate an itinerary)
  }

  protected static getClient(): AxiosInstance {
    return Axios.create(Solea.baseParams)
  }

  protected static effectRequest<T>(params: AxiosRequestConfig): Promise<T> {
    return this.getClient()
      .request<T>(params)
      .then((res) => res.data)
  }
}

export default Solea

export * from './types'
