
import type { Product } from "../../interfaces";
import { getToken } from "../Authentication/auth.api";
import type { CreateProductRequest } from "../../interfaces/CreateProductRequest";

// Hämta alla produkter
export async function getAllProducts(): Promise<Product[]> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig");

  const res = await fetch("https://localhost:7089/api/Parts", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch error:", text);
    throw new Error("Fel vid hämtning av produkter");
  }

  return await res.json();
}

// Hämta produkter med lågt lagersaldo
export async function getLowstock(): Promise<Product[]> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig");

  const res = await fetch("https://localhost:7089/api/Parts/lowstock", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch lowstock error:", text);
    throw new Error("Fel vid hämtning av produkter med låg lager");
  }

  return await res.json();
}

// Hämta detaljer för en produkt
export async function getProductDetails(productId: number): Promise<Product> {
  if (!productId) throw new Error("Produkt-id saknas");

  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig");

  const res = await fetch(`https://localhost:7089/api/Parts/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch product details error:", text);
    throw new Error(`Fel vid hämtning av produkt: ${productId}`);
  }

  return await res.json();
}

//Registrera en ny produkt
export async function createProduct(product: CreateProductRequest): Promise<void> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig");

  const res = await fetch("https://localhost:7089/api/Parts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Registrering av produkt error:", text);
    throw new Error("Fel vid skapande av ny produkt");
  }
}