# Projektöversikt

Detta examensarbete går ut på att utveckla ett lagerhanteringssystem som möjliggör
administration av reservdelar, lagersaldon, transaktioner och användare.

## Syfte
Att skapa ett modernt och användarvänligt lagerhanteringssystem som 
demonstrerar god kodstruktur, testbar arkitektur och tydlig dokumentation.

## Tekniker
### Frontend
- React
- Vite
- TypeScript
- CSS Modules

### Backend
- C#, ASP.NET Core Web API
- Entity Framework Core
- SQL Server
- Migrationer via EF
- JWT-autentisering

### Databas
- Microsoft SQL Server
- Entity Framework migrations

## Arbetsprocess
- Scrum (3 veckor)
- Jira för planering
- GitHub för versionshantering
- Branch-strategi: main, feature-branches


**----------------------------------------------------**


## Projektstruktur
### Frontend

- /src
-- /components
--- /admin-components
--- /parts-components
-- /context
-- /interfaces
-- /mock
-- /pages
-- /routes
-- /services
--- /Authentication
--- /Parts
-- /styles
- main.tsx
- App.tsx

### Backend

- /Controllers
- /Data
- /Filters
- /Migrations
- /Models
-- /DTOs
- /Services

## Mål med projektet
- Implementera ett fungerande lagerhanteringssystem
- Säker autentisering
- Tydlig dokumentation
- Testning via Postman/Swagger och manuella testfall
