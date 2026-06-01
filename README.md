# Žar 

## Link

[link na stranicu](https://resttorran.netlify.app/)
## Opis projekta

Žar je web aplikacija restorana izrađena u HTML-u, CSS-u i JavaScriptu bez korištenja frameworka. Aplikacija omogućuje pregled jelovnika, pretragu i filtriranje jela, spremanje favorita te slanje rezervacija bez ponovnog učitavanja stranice.

Projekt je izrađen za kolegij **Uvod u Web tehnologije**.

---

## Funkcionalnosti

### Dinamički prikaz podataka

Jelovnik se dinamički učitava iz JSON datoteke (`data.json`) pomoću JavaScripta i prikazuje kao kartice.

### Pretraga i filtriranje

Korisnik može:

- pretraživati jela po nazivu
- filtrirati jela po kategorijama
- pregledavati samo favorite

### Favoriti

Korisnik može spremiti jela u favorite.

Favoriti se spremaju u `localStorage` pa ostaju spremljeni i nakon osvježavanja stranice.

### Rezervacije

Forma za rezervaciju:

- koristi HTML validaciju
- obrađuje podatke pomoću JavaScripta
- ne učitava ponovno stranicu
- prikazuje poruku o uspješnom slanju

### UI stanja

Aplikacija prikazuje:

- loading stanje tijekom učitavanja podataka
- error stanje ako učitavanje ne uspije
- empty stanje kada nema rezultata pretrage

### Animacije

Kartice jela animirano se prikazuju prilikom učitavanja sadržaja.

---

## Stranice

### Početna

`index.html`

Predstavlja restoran i njegove usluge.

### Jelovnik

`jelovnik.html`

Prikaz svih jela s pretragom, filtriranjem i favoritima.

### Dostava

`dostava.html`

Informacije o dostavi hrane.

### Lokacija

`lokacija.html`

Adresa, radno vrijeme i lokacija restorana.

### Rezervacije

`rezervacije.html`

Forma za rezervaciju stola.

### O nama

`onama.html`

Informacije o restoranu.

### Kontakt

`kontakt.html`

Kontakt podaci restorana.

---

## Tehnologije

- HTML5
- CSS3
- JavaScript (ES6)
- JSON
- Local Storage API
- Fetch API

---

## Implementirani zahtjevi projekta

### Dinamički prikaz podataka

Podaci se učitavaju iz JSON datoteke i prikazuju pomoću JavaScripta.

### Interakcija korisnika

- klik na kategorije
- pretraga jela
- spremanje favorita
- slanje forme

### Forma u JavaScriptu

- obrada submit događaja
- validacija
- poruke korisniku

### State

Aplikacija prati:

- trenutnu pretragu
- odabranu kategoriju
- spremljene favorite

### Perzistencija

Favoriti se spremaju u `localStorage`.

### Async

Podaci se dohvaćaju pomoću `fetch()` funkcije.

### UI stanja

Implementirana su:

- loading
- error
- empty

### Organizacija koda

JavaScript je organiziran kroz funkcije za:

- učitavanje podataka
- renderiranje sadržaja
- filtriranje
- upravljanje favoritima
- obradu forme

---

## Struktura projekta

```text
/
│
├── index.html
├── jelovnik.html
├── dostava.html
├── lokacija.html
├── rezervacije.html
├── onama.html
├── kontakt.html
│
├── style.css
├── main.js
├── data.json
│
└── slike/
```

## Pokretanje projekta

1. Preuzeti projekt.
2. Otvoriti mapu u Visual Studio Code-u.
3. Pokrenuti pomoću Live Server ekstenzije.

Ili otvoriti objavljenu verziju:

https://kbprojekt1.netlify.app/

---

## Autor

Kristijan Bobanović
