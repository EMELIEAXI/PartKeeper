# Arkitekturöversikt

## :large_blue_diamond:Systemarkitektur
Systemet består av tre delar

1. **Frontend (React + vite)** \
Renderar UI, kommunicerar med API via fetch.

3. **Backend (ASP .NET Core Web API)** \
Exponerar REST-endpoints för CRUD, autentisering och transaktioner.

4. **Databas (SQL server)** \
Lagrar reservdelar, användare, lagerloggar och transaktioner.

## :large_blue_diamond:Backend

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


## :large_blue_diamond:Frontend

### components
UI-element uppdelade i admin- och parts-komponenter.

### pages
Sidvyer

### services
Fetch-anrop till backend

**Exempel:** \
export async function login(email: string, password: string): Promise<LoginResponse> { \
&ensp;const res = await fetch("https://localhost:7089/api/Auth/login", { \
&emsp;method: "POST", \
&emsp;headers: { "Content-Type": "application/json" }, \
&emsp;body: JSON.stringify({ email, password }), \
&ensp;});

### context
Globalt state (inloggad användare, token etc.)

### interfaces
TypeScript-typer (Category, Product, Transactions etc.)

### routes
Central hantering av navigation och routing i applikationen.

**Exempel:** \
type Props = { \
&emsp;children: JSX.Element; \
};

export default function ProtectedRoute({ children }: Props) { \
&emsp;const { isAuthenticated } = useAuth();

&emsp;if (!isAuthenticated) { \
&emsp;&ensp;return <Navigate to="/login" replace />; \
&emsp;}

&emsp;return children; \
}

### styles
Innehåller modulbaserade styles.
