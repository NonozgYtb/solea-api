# Solea - API

Support non officiel de l'API de SOLEA, réseau de transport en commun de l'agglomération de Mulhouse (m2a).
D'autres données annexes sont également récupérées. (Navette centre-ville de Mulhouse, voir la [documentation](#Navette)).

> [!WARNING]  
> Ce module n'est pas officiel et n'est pas affilié à SOLEA ni d'autres tiers.
> Les données récupérées peuvent ne pas être à jour ou incorrectes.
> De même, les auteurs de ce module ne sont pas responsables de l'utilisation que vous en faites. Ce code est donné "en l'état".
> Enfin, ceci ne constitue en aucune manière une documentation de l'API de SOLEA ni des autres services. Leurs formats de donnée peuvent d'ailleurs changer à tout moment.
> Afin de ne pas surcharger les serveurs de SOLEA, merci de ne pas abuser de ce module, surtout la fonctionnalité "itinéraire".

<a name="Solea"></a>

## Solea
Solea-API

Ce module permet de récupérer entre autre :
- les prochains passages
- les lignes
- les arrêts
- le calcul d'itinéraire
- le trajet de la navette du centre-ville de Mulhouse

**Note :** La position de la navette n'est accessible que via un socket (non websocket) et n'est pas (et ne sera pas) implémentée.
Cependant, une petite doc est disponible pour l'implémentation de cette fonctionnalité. (voir [ici]())
***

&copy; 2024 NonozgYtb

*Avec l'aide et en reprenant la structure d'un projet de : [Maël Gangloff](https://github.com/maelgangloff)*

**Kind**: global class  
**See**: https://github.com/NonozgYtb/solea-api  

* [Solea](#Solea)
    * [.getArrets()](#Solea.getArrets) ⇒ <code>Promise.&lt;Array.&lt;Arret&gt;&gt;</code>
    * [.getLignes()](#Solea.getLignes) ⇒ <code>Promise.&lt;Array.&lt;Ligne&gt;&gt;</code>
    * [.getPassages(idPoteau, idLigne, date)](#Solea.getPassages) ⇒ <code>Promise.&lt;Passage&gt;</code>
    * [.getLignePicto(idLigne)](#Solea.getLignePicto) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getInfosTrafic()](#Solea.getInfosTrafic) ⇒ <code>Promise.&lt;Array.&lt;InfoTrafic&gt;&gt;</code>
    * [.getTitres(type)](#Solea.getTitres) ⇒ <code>Promise.&lt;Array.&lt;Titre&gt;&gt;</code>
    * [.searchPOI(query)](#Solea.searchPOI) ⇒ <code>Promise.&lt;Array.&lt;POI&gt;&gt;</code>
    * [.listPOI()](#Solea.listPOI) ⇒ <code>Promise.&lt;Array.&lt;POI&gt;&gt;</code>
    * [.searchAddress(query)](#Solea.searchAddress) ⇒ <code>Promise.&lt;Array.&lt;Adresse&gt;&gt;</code>
    * [.searchItineraire(itineraireParams)](#Solea.searchItineraire) ⇒ <code>Promise.&lt;Array.&lt;Itineraire&gt;&gt;</code>
    * [.getNavettePath()](#Solea.getNavettePath) ⇒ <code>Promise.&lt;NavettePath&gt;</code>

<a name="Solea.getArrets"></a>

### Solea.getArrets() ⇒ <code>Promise.&lt;Array.&lt;Arret&gt;&gt;</code>
Lister les arrets du réseau de transport, avec les lignes qui y passent

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;Arret&gt;&gt;</code> - Une liste contenant les arrets du réseau  
**Example**  
```js
const { Solea } = require('solea-api')

Solea.getArrets().then(arrets => console.log(arrets))
```
<a name="Solea.getLignes"></a>

### Solea.getLignes() ⇒ <code>Promise.&lt;Array.&lt;Ligne&gt;&gt;</code>
Lister les lignes du réseau de transport

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;Ligne&gt;&gt;</code> - Une liste contenant les lignes du réseau  
**Example**  
```js
const { Solea } = require('solea-api')

Solea.getLignes().then(lignes => console.log(lignes))
```
<a name="Solea.getPassages"></a>

### Solea.getPassages(idPoteau, idLigne, date) ⇒ <code>Promise.&lt;Passage&gt;</code>
Récupérer les prochains passages à un arrêt en fonction d'une ligne

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Passage&gt;</code> - Les prochains passages à l'arrêt  

| Param | Description |
| --- | --- |
| idPoteau | L'identifiant de l'arrêt |
| idLigne | L'identifiant de la ligne |
| date | La date à laquelle on veut récupérer les passages (par défaut, la date actuelle) |

**Example**  
```js
const { Solea } = require('solea-api')

Solea.getPassages(271, "C5", new Date())
    .then(passages => console.log(passages))
```
Les Champs ìdPoteau et idLigne sont disponibles à partir de `getArrets`.

Pour chaque `lignes` de `getArrets` :
  - `idPoteau` correspond à `sae`
  - `idLigne` correspond à `ligne`
<a name="Solea.getLignePicto"></a>

### Solea.getLignePicto(idLigne) ⇒ <code>Promise.&lt;string&gt;</code>
Récupère le picto d'une ligne

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Le picto de la ligne en PNG (format texte base64)  

| Param | Description |
| --- | --- |
| idLigne | L'identifiant de la ligne (ex: "C5", "94", "14") |

**Example**  
```js
const { Solea } = require('solea-api')

Solea.getLignePicto("C4")
 .then(rawdata => fs.writeFileSync('C4.png', Buffer.from(rawdata, 'base64')))
```
<a name="Solea.getInfosTrafic"></a>

### Solea.getInfosTrafic() ⇒ <code>Promise.&lt;Array.&lt;InfoTrafic&gt;&gt;</code>
Récupère les infos trafic impactants actuellement du réseau

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;InfoTrafic&gt;&gt;</code> - Les informations trafic  
**Example**  
```js
const { Solea } = require('solea-api')

Solea.getInfosTrafic().then((infos)=>console.log(infos))
```
<a name="Solea.getTitres"></a>

### Solea.getTitres(type) ⇒ <code>Promise.&lt;Array.&lt;Titre&gt;&gt;</code>
Récupère les titres de transport disponibles

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;Titre&gt;&gt;</code> - Les titres de transport  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>&#x27;tickets&#x27;</code> \| <code>&#x27;abonnements&#x27;</code> \| <code>&#x27;both&#x27;</code> | <code>both</code> | Le type de titre à récupérer ('tickets', 'abonnements' ou 'both') |

**Example**  
```js
const { Solea } = require('solea-api')

Solea.getTitres('tickets').then((tickets)=>console.log(tickets))
```
<a name="Solea.searchPOI"></a>

### Solea.searchPOI(query) ⇒ <code>Promise.&lt;Array.&lt;POI&gt;&gt;</code>
Récupère les POI (Points d'Intérêt) à partir d'une recherche

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;POI&gt;&gt;</code> - Les points d'intérêt  

| Param | Description |
| --- | --- |
| query | La recherche à effectuer |

<a name="Solea.listPOI"></a>

### Solea.listPOI() ⇒ <code>Promise.&lt;Array.&lt;POI&gt;&gt;</code>
Liste tous les POI (Points d'Intérêt)

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;POI&gt;&gt;</code> - Les points d'intérêt  
<a name="Solea.searchAddress"></a>

### Solea.searchAddress(query) ⇒ <code>Promise.&lt;Array.&lt;Adresse&gt;&gt;</code>
Récupère les adresses à partir d'une recherche

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;Adresse&gt;&gt;</code> - Les adresses  

| Param | Description |
| --- | --- |
| query | La recherche à effectuer |

<a name="Solea.searchItineraire"></a>

### Solea.searchItineraire(itineraireParams) ⇒ <code>Promise.&lt;Array.&lt;Itineraire&gt;&gt;</code>
Liste toutes les adresses

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;Array.&lt;Itineraire&gt;&gt;</code> - Les itinéraires  

| Param | Description |
| --- | --- |
| itineraireParams | Les paramètres de l'itinéraire |

<a name="Solea.getNavettePath"></a>

### Solea.getNavettePath() ⇒ <code>Promise.&lt;NavettePath&gt;</code>
Récupère le tracé de la navette de Mulhouse en temps réel

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;NavettePath&gt;</code> - Les données de la navette  
**Example**  
```js
const { Solea } = require('solea-api')

Solea.getNavettePath().then((navette)=>console.log("Le tracé actuel en point GPS de la navette :",navette.data))
```

* * *

<a name="Navette"></a>

### Position de la Navette de Mulhouse, par Soléa (Transports Mulhouse Agglomération)

*Préambule :*
> L'utilisateur peut récupérer via l'application Soléa la position de la (des) navette(s) actuellement présente dans le centre ville de Mulhouse.
> Cela ce fait via un socket utilisé par l'application Android.
> Etant un socket (ni websocket ni route web http/https), la récupération ne peut pas se faire directement sur une page web. 
> Le processus de récupération des posiitons des navettes est de ce fait complètement différent.

**C'est pour cela que ce module n'inplémente pas (et n'implémentera jamais) la récupération de la position des navettes.**

Cependant, voici quelques informations pouvant être utiles :

* **Adresse du serveur :** `lanavette.mulhouse.fr`
* **Port du serveur :** `18099`
* **Type de socket :** `TCP` (non sécurisé/non WebSocket ni Socket.IO)

Le type retourné est `NavetteSocketData` :
```typescript
export interface NavettePosition {
  id: string
  lng: number
  lat: number
  tmstp: number
  old?: boolean
}

export type NavetteSocketData = {
  [id: string]: NavettePosition
}
```
De plus, lors du premier message reçu par le serveur via le socket, il n'y a pas de champ "old", sinon il y a un champ "old" qui semble rester à *false* tout le temps.

(Ex. : `{"5868f5dbf6105d2c":{"id":"5868f5dbf6105d2c","lng":7.332557,"lat":47.747186,"tmstp":1732365820,"old":false}}`)

*Exemple de code pour récupérer les données :*
```javascript
const net = require('net')
const client = new net.Socket()

client.connect(18099, 'lanavette.mulhouse.fr', () => {
  console.log('Connecté !')
})
client.on('data', (data) => {
  const json = JSON.parse(data.toString())
  console.log('Nouvelle position :', json)
})
client.on('close', () => {
  console.log('Connexion fermée')
})
// Fermeture de la connexion après 10s
setTimeout(() => {
  client.destroy()
}, 10000)
```

* * *

&copy; 2024 NonozgYtb

*Avec l'aide et en reprenant la structure d'un projet de : [Maël Gangloff](https://github.com/maelgangloff)*
