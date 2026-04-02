# 🎬 Democratic Cinema

Een webapplicatie voor een "democratische bioscoop", waarin gebruikers kunnen:

* films bekijken
* stemmen op films
* het speelschema bekijken
* stoelen reserveren
* tickets bestellen

Daarnaast is er een admin-paneel voor het beheren van films.

---

## 📦 Projectstructuur

```
project-root/
│
├── democratic-cinema-backend/   # Node.js (Fastify API)
├── democratic-cinema-frontend/  # React + Vite
├── package.json                 # Workspace + gezamenlijke scripts
└── README.md
```

---

## ⚙️ Vereisten

* Node.js >= 18
* npm >= 9

---

## 🚀 Installatie

Voer installatie uit **in de root van het project**:

```bash
npm install
```

Dit installeert dependencies voor zowel:

* backend
* frontend

---

## ▶️ Project starten

### Alles tegelijk starten (aanbevolen)

```bash
npm run dev
```

Dit start:

* 🌐 Frontend (Vite)
* 🧠 Backend (Node / Fastify)

---

### Apart starten

Frontend:

```bash
npm run dev -w democratic-cinema-frontend
```

Backend:

```bash
npm run dev -w democratic-cinema-backend
```

---

## 🌍 Environment variabelen

### Backend (`democratic-cinema-backend/.env`)

```env
PORT=4003
```

---

### Frontend (`democratic-cinema-frontend/.env`)

```env
VITE_BACKEND_API_URL=http://localhost:3000
```

---

## 🔐 Admin authenticatie

### Registratie

```
POST /admin/register
```

Body:

```json
{
  "login": "admin",
  "password": "1234",
  "apiKey": "YOUR_API_KEY"
}
```

---

### Login

```
POST /admin/login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

Token wordt opgeslagen in:

```js
sessionStorage.setItem("adminToken", token);
```

---

## 🎥 API endpoints

### Films ophalen

```
GET /films
```

---

### Film aanmaken (admin)

```
POST /films
Authorization: Bearer TOKEN
```

---

### Film bewerken (admin)

```
PUT /films/:id
```

⚠️ Wordt geïmplementeerd via:

* nieuwe film aanmaken
* oude film verwijderen

---

### Film verwijderen

```
DELETE /films/:id
```

---

### Stemmen

```
PUT /films/:id/vote
```

---

## 🧠 Architectuur

### Backend

* Fastify
* Service layer (`services/`)
* Middleware (`middleware/`)
* Routes (`routes/`)

Werkt als proxy naar een externe API.

---

### Frontend

* React + Vite
* Tailwind CSS
* SPA zonder React Router (eigen routing via state)

---

## ⚠️ Belangrijke punten

### 1. Geen sessions

Voorheen:

```js
sessions: []
```

Nu:

```js
date (timestamp)
```

---

### 2. Filmstructuur

```js
{
  _id,
  title,
  description,
  category,
  url_trailer,
  url_image,
  votes,
  date,
  timestamp
}
```

---

### 3. CORS

Backend moet toestaan:

```
Authorization
Content-Type
```

---

## 🛠 Handige commands

```bash
npm run dev          # alles starten
npm run dev:frontend # alleen frontend
npm run dev:backend  # alleen backend
```
