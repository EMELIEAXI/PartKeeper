# Installation / setup

Detta dokument beskriver hur man startar hela utvecklingsmiljön för projektet: 
databas, backend och frontend. Följ dessa steg för att få allt att fungera lokalt.

**-----------**

## 1. Förutsättningar
Installera följande:

- .NET 8 SDK
- SQL Server (LocalDB eller full version)
- Node.js (version 18 eller senare)

## 2. Databas
Projektet använder SQL Server.

Anslut till LocalDB i SSMS:

Kör migreringar från backend:
- cd backend
- dotnet ef database update

## 3. Starta backend
Starta backend i backend-mappen:
- dotnet run

Backend körs på port 7089 och 5089.

## 4. Starta frontend
Installera paket och starta frontend med följande kommandon:

- npm install
- npm run dev

Frontend körs på port 5173.

## 5. Frontend-Backend kommunikation
Frontend anropar backend med fetch.

**Exempel:**
fetch("https://localhost:7089/api/parts");

CORS måste tillåta:
`http://localhost:5173`