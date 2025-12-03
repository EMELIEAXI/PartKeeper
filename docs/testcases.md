# Manuella testfall

Detta dokument beskriver manuella testfall för backend och frontend.
Tester uförs via frontend och Swagger.


## 1. Autentisering

### A1 – Login (POST /api/Auth/login)
**Steg:**
1. Öppna Swagger.
2. Kör POST `/api/Auth/login` med giltiga credentials.

**Förväntat resultat:**
- Status: `200 OK`
- Token returneras.

### A2 - Login med fel lösenord
**Steg:**
1. Kör POST `/api/Auth/login` med fel lösenord.

**Förväntat resultat:**
- Status: `401 error`
- Felmeddelande: Fel e-post eller lösenord.

### A3 - Registrering
**Steg:**
1. Kör POST `/api/Auth/register` med ny användare.

**Förväntat resultat:**
- Status: `200 OK`
- Meddelande: Användare skapad.

### A4 – Hämta alla användare
**Steg:**
- Kör GET `/api/Auth`.

**Förväntat resultat:**
- Status: `200 OK`
- Lista med användare returneras.

### A5 – Uppdatera användare
**Steg:**
- Kör PUT `/api/Auth/update/{id}` med uppdaterade data.

**Förväntat resultat:**
- Status: `200 OK`
- Meddelande: Användare uppdaterad.

### A6 – Radera användare
**Steg:**
- Kör DELETE `/api/Auth/{id}` på ett existerande ID.

**Förväntat resultat:**
- Status: `200 OK`
- Användaren finns inte längre i GET-listan.


**---------------------------------**


## 2. Kategorier

### C1 – Hämta alla kategorier
**Steg:**
- Kör GET `/api/Categories`.

**Förväntat resultat:**
- Status: `200 OK`
- Lista med kategorier returneras.

### C2 – Skapa kategori (POST /api/Categories)
**Steg:**
- Kör POST `/api/Categories`.

**Exempeldata:**
{ "categoryName": "Verktyg" }

**Förväntat resultat:**
- Status: `201 Created`
- GET /api/Categories visar den nya kategorin.

### C3 - Hämta kategori per ID
**Steg:**
- Kör GET `/api/Categories/{id}`

**Förväntat resultat:**
- Status: `200 OK`
- Rätt kategori returneras.

### C4 - Uppdatera kategori
**Steg:**
- Kör PUT `/api/Categories/{id}` med ny information.

**Förväntat resultat:**
- Status: `200 OK`
- Kategorins information uppdateras.

### C5 - Radera kategori
**Steg:**
- Kör DELETE `/api/Categories/{id}`

**Förväntat resultat:**
- Status: `204 No Content`
- Kategorin finns inte längre i GET-listan
- Kategori med GET {id} returnerar: Kategori med id {} hittades inte.


**---------------------------------**


## 3. Parts

### P1 - Hämta alla artiklar
**Steg:**
- Kör GET `/api/Parts`

**Förväntat resultat:**
- Status: `200 OK`
- Lista över artiklar returneras.

### P2 - Skapa artikel
**Steg:**
- Kör POST `/api/Parts`

**Exempeldata:**
{
  "productName": "Exempel",
  "articleNumber": "12345",
  "quantity": 10,
  "categoryId": 1,
  "location": "A5",
  "minimumStock": 5,
  "description": "Exempeldata" 
}

**Förväntat resultat:**
- Status: `201 Created`
- GET `/api/Parts` visar den nya artikeln.

### P3 - Hämtal artikel per ID
**Steg:**
- Kör GET `/api/Parts/{id}` med artikelns id.

**Förväntat resultat:**
- Status: `200 OK`
- Rätt artikel returneras.

### P4 - Uppdatera artikel
**Steg:**
- Kör PUT `/api/Parts/{id}` med uppdaterad data.

**Förväntat resultat:**
- Status: `200 OK`
- Artikeln uppdateras.

### P5 - Radera artikel
**Steg:**
- Kör DELETE `/api/Parts/{id}`

**Förväntat resultat:**
- Status: `204 No Content`

### P6 - Hämta artiklar med lågt saldo
**Steg:**
- Kör GET `/api/Parts/lowstock`

**Förväntat resultat:**
- Status: `200 OK`
- Enbart artiklar med lågt saldo returneras.


**---------------------------------**


## 4. Transaktioner

### T1 - Skapa transaktion
**Steg:**
- Kör POST `/api/Transactions`

**Exempeldata:**
{
  "productId": 3,
  "quantityChange": 15,
  "transactionType": "Add",
  "comment": "Exempel"
}

**Förväntat resultat:**
- Status: `200 OK`
- Lagernivån ändras beroende på transaktionstyp.

### T2 - Hämta alla transaktioner
**Steg:**
- Kör GET `/api/Transactions`

**Förväntat resultat:**
- Status: `200 OK`
- Lista med transaktioner returneras.


**---------------------------------**


## 5. Protected Routes (frontend)

### PR1 - Skyddad sida utan inloggning
**Steg:**
- Navigera till `/parts` utan att logga in.

**Förväntat resultat:**
- Redirect till `/login`

### PR2 - Skyddad sida med inloggning
**Steg:**
- Logga in
- Navigera till `/parts`

**Förväntat resultat:**
- Sidan laddas normalt.
