import Axios, { AxiosInstance } from 'axios'
import { Arret } from './Solea/Arret'
import { Ligne } from './Solea/Ligne'
import { Titre } from './Solea/Titre'
import { POI } from './Solea/POI'
import { Adresse } from './Solea/Adresse'
import { Itineraire } from './Solea/ItineraireResult'
import { ItineraireParams } from './Solea/ItineraireParams'
import qs from 'qs'
import { InfoTrafic } from './Solea/InfoTrafic'
import { Passage } from './Solea/PassagesPoteau'
import { NavetteData } from './Solea/Navette'

/**
 * Support non officiel de l'API de SOLEA, réseau de transport en commun de l'agglomération de Mulhouse (m2a).
 *
 * Ce module permet de récupérer actuellement :
 * - les prochains passages
 * - les lignes
 * - les arrêts
 * - les passages de la navette du centre-ville de Mulhouse
 *
 */
export class Solea {
  /**
   * Lister les arrets du réseau de transport, avec les lignes qui y passent
   * @example ```js
   * const { Solea } = require('solea-api')
   *
   * Solea.getArrets().then(arrets => console.log(arrets))
   * ```
   * @returns {Promise<Arret[]>} Une liste contenant les arrets du réseau
   */
  public static async getArrets() {
    return this.getClient()
      .request<Arret[]>({ url: '/reseau/arretsconcise_sens' })
      .then((res) => res.data)
  }

  /**
   * Lister les lignes du réseau de transport
   * @example ```js
   * const { Solea } = require('solea-api')
   *
   * Solea.getLignes().then(lignes => console.log(lignes))
   * ```
   * @returns {Promise<Ligne[]>} Une liste contenant les lignes du réseau
   */
  public static async getLignes() {
    return this.getClient()
      .request<Ligne[]>({ url: '/reseau/lignes' })
      .then((res) => res.data)
  }

  /**
   * Récupérer les prochains passages à un arrêt en fonction d'une ligne
   * @example ```js
   * const { Solea } = require('solea-api')
   *
   * Solea.getPassages(271, "C5", new Date())
   *     .then(passages => console.log(passages))
   * ```
   * Les Champs ìdPoteau et idLigne sont disponibles à partir de `getArrets`.
   *
   * Pour chaque `lignes` de `getArrets` :
   *   - `idPoteau` correspond à `sae`
   *   - `idLigne` correspond à `ligne`
   *
   * @param idPoteau L'identifiant de l'arrêt
   * @param idLigne L'identifiant de la ligne
   * @param date La date à laquelle on veut récupérer les passages (par défaut, la date actuelle)
   * @returns {Promise<Passage>} Les prochains passages à l'arrêt
   */
  public static async getPassages(
    idPoteau: number,
    idLigne: string,
    date = new Date()
  ) {
    return this.getClient()
      .request<Passage>({
        url: `/reseau/poteau/${idPoteau}/${idLigne}/${Math.floor(
          date.getTime() / 1000
        )}/reel`
      })
      .then((res) => res.data)
  }

  /**
   *
   * Récupère le picto d'une ligne
   *
   * @example ```js
   * const { Solea } = require('solea-api')
   *
   * Solea.getLignePicto("C4")
   *  .then(rawdata => fs.writeFileSync('C4.png', Buffer.from(rawdata, 'base64')))
   * ```
   *
   * @param idLigne L'identifiant de la ligne (ex: "C5", "94", "14")
   * @returns {Promise<string>} Le picto de la ligne en PNG (format texte base64)
   */
  public static async getLignePicto(idLigne: string) {
    return this.getClient()
      .request<string>({
        url: `/reseau/ligne/${idLigne}/picto`,
        responseType: 'text',
        responseEncoding: 'base64'
      })
      .then((res) => res.data)
  }

  /**
   * Récupère les infos trafic impactants actuellement du réseau
   *
   * @example ```js
   * const { Solea } = require('solea-api')
   *
   * Solea.getInfosTrafic().then((infos)=>console.log(infos))
   * ```
   *
   * @returns {Promise<InfoTrafic[]>} Les informations trafic
   */
  public static async getInfosTrafic() {
    return this.getClient()
      .request<InfoTrafic[]>({ url: '/reseau/infos_trafic/' })
      .then((res) => res.data)
  }

  /**
   * Récupère les titres de transport disponibles
   *
   * @param type Le type de titre à récupérer (tickets ou abonnements ou both pour les deux)
   *
   * @example ```js
   * const { Solea } = require('solea-api')
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
    return this.getClient()
      .request({ url: `/reseau/titres/${type}` })
      .then((res) => res.data)
  }

  /**
   * Récupère les POI (Points d'Intérêt) à partir d'une recherche
   *
   * @param query La recherche à effectuer
   * @returns {Promise<POI[]>} Les points d'intérêt
   */
  public static async searchPOI(query: string) {
    return this.getClient()
      .request<POI[]>({ url: '/geo/search/poi', params: { query } })
      .then((res) => res.data)
  }

  /**
   * Liste tous les POI (Points d'Intérêt)
   *
   * @returns {Promise<POI[]>} Les points d'intérêt
   */
  public static async listPOI() {
    return this.getClient()
      .request<POI[]>({ url: '/geo/poi' })
      .then((res) => res.data)
  }

  /**
   * Récupère les adresses à partir d'une recherche
   * @param query La recherche à effectuer
   *
   * @returns {Promise<Adresse[]>} Les adresses
   */
  public static async searchAddress(query: string) {
    return this.getClient()
      .request<Adresse[]>({ url: '/geo/search/adresse', params: { query } })
      .then((res) => res.data)
  }

  /**
   * Liste toutes les adresses
   * @param itineraireParams Les paramètres de l'itinéraire
   *
   * @returns {Promise<Itineraire[]>} Les itinéraires
   */
  public static async searchItineraire(itineraireParams: ItineraireParams) {
    return this.getClient()
      .request<Itineraire[]>({
        url: '/geo/calcule/itimobi',
        method: 'POST',
        data: qs.stringify(itineraireParams)
      })
      .then((res) => res.data)
  }

  /**
   * Récupère le tracé de la navette de Mulhouse en temps réel
   * @example ```js
   * const { Solea } = require('solea-api')
   *
   * Solea.getNavettePath().then((navette)=>console.log("Le tracé actuel en point GPS de la navette :",navette.data))
   * ```
   * @returns {Promise<NavetteData>} Les données de la navette
   */
  public static async getNavettePath() {
    return Axios.request<NavetteData>({
      url: 'http://lanavette.mulhouse.fr/api'
    })
  }

  // TODO : Utiliser le socket de la navette pour obtenir la position des véhicules.

  private static getClient(): AxiosInstance {
    return Axios.create({
      baseURL: 'https://api.solea.info/v1',
      headers: {
        'User-Agent': 'Solea/Android',
        Authorization: `Basic ${((a) =>
          a('VnQ=dE1zb2xGbGVTbmEyZXg6YXJ0bGVub2JpZWFtc29s')
            .match(/.{1,4}/g)
            ?.map(a)
            .join(''))((e: string) => [...e].reverse().join(''))}`
      },
      timeout: 30 * 1000 // sometime the API is slow (especially when we calculate an itinerary)
    })
  }
}

export default Solea
