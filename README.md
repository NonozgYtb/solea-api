# Solea - API

Support non officiel de l'API de SOLEA, réseau de transport en commun de l'agglomération de Mulhouse (m2a).
D'autres données annexes sont également récupérées. (Navette centre-ville de Mulhouse)

> [!WARNING]  
> Ce module n'est pas officiel et n'est pas affilié à SOLEA.
> Les données récupérées peuvent ne pas être à jour ou incorrectes.
> De même, les auteurs de ce module ne sont pas responsables de l'utilisation que vous en faites.
> Enfin, l'API de SOLEA n'est pas documentée et peut changer à tout moment.
> Afin de ne pas surcharger les serveurs de SOLEA, merci de ne pas abuser de ce module, surtout la fonctionnalité "itinéraire".

Ce module permet de récupérer entre autre :
- les prochains passages
- les lignes
- les arrêts
- le calcul d'itinéraire
- le trajet de la navette du centre-ville de Mulhouse

&copy; 2024 NonozgYtb

*Avec l'aide et en reprenant la structure d'un projet de : [Maël Gangloff](https://github.com/maelgangloff)*

* * *

Documentation de la classe `Solea` :

<a name="Solea"></a>

## Solea
Solea-API
Ce module permet de récupérer entre autre :
- les prochains passages
- les lignes
- les arrêts
- le calcul d'itinéraire
- le trajet de la navette du centre-ville de Mulhouse

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
    * [.getNavettePath()](#Solea.getNavettePath) ⇒ <code>Promise.&lt;NavetteData&gt;</code>

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

| Param | Default | Description |
| --- | --- | --- |
| type | <code>both</code> | Le type de titre à récupérer (tickets ou abonnements ou both pour les deux) |

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

### Solea.getNavettePath() ⇒ <code>Promise.&lt;NavetteData&gt;</code>
Récupère le tracé de la navette de Mulhouse en temps réel

**Kind**: static method of [<code>Solea</code>](#Solea)  
**Returns**: <code>Promise.&lt;NavetteData&gt;</code> - Les données de la navette  
**Example**  
```js
const { Solea } = require('solea-api')

Solea.getNavettePath().then((navette)=>console.log("Le tracé actuel en point GPS de la navette :",navette.data))
```

* * *

&copy; 2024 NonozgYtb

*Avec l'aide et en reprenant la structure d'un projet de : [Maël Gangloff](https://github.com/maelgangloff)*