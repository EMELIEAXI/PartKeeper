# Arkitekturöversikt

## Systemarkitektur
Systemet består av tre delar

1. **Frontend (React + vite)**
Renderar UI, kommunicerar med API via fetch.

2. **Backend (ASP .NET Core Web API)**
Exponerar REST-endpoints för CRUD, autentisering och transaktioner.

3. **Databas (SQL server)**
Lagrar reservdelar, användare, lagerloggar och transaktioner.

## Backend

### Controllers
Tar emot requests, validerar input och kallar på services.

### Services
Innehåller affärslogik, validering och transaktioner.

### Data
DbContext och EF-konfiguration.

### Models / DTO
Databasmodeller och DTOs som bestämmer vad som skickas till frontend.

### Filters
Felhantering och validering.


**----------------------------------------------------**


## Frontend

### components
UI-element uppdelade i admin- och parts-komponenter.

### pages
Sidvyer

### services
Fetch-anrop till backend

**Exempel:**
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch("https://localhost:7089/api/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

### context
Globalt state (inloggad användare, token etc.)

### interfaces
TypeScript-typer (Category, Product, Transactions etc.)

### routes
Central hantering av navigation och routing i applikationen.

**Exempel:**
type Props = {
  children: JSX.Element;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

### styles
Innehåller modulbaserade styles.
