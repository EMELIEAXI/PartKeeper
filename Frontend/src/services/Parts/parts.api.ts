
import type { Category, Product } from "../../interfaces";
import { getToken } from "../Authentication/auth.api";
import type { CreateProductRequest } from "../../interfaces/CreateProductRequest";
import type { CreateCategoryRequest } from "../../interfaces/CreateCategoryRequest";

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

  const data = await res.json();
  console.log("Produkter från backend:", data)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((p: any) => ({
    id: p.id,
    productName: p.productName,
    articleNumber: p.articleNumber,
    quantity: p.quantity,
    categoryId: p.categoryId,
    minimumStock: p.minimumStock,
    location: p.location,
    description: p.description,
    createdAt: new Date(p.createdAt)
  }));
  // return await res.json();
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

// Uppdate produkt
export async function updateProduct(id: number, product: Product): Promise<void> {
  const token = getToken();
  if (!token) throw new Error("Ingen roken tillgänglig!");

  const res = await fetch(`https://localhost:7089/api/Parts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      productName: product.productName,
      articleNumber: product.articleNumber,
      quantity: product.quantity,
      categoryId: product.categoryId,
      location: product.location,
      minimumStock: product.minimumStock,
      description: product.description
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Update product error:", text);
    throw new Error("Fel vid uppdatering av produkt");
  }
}

// Radera en produkt
export async function deleteProduct(id: number): Promise<void> {
  const token = getToken();

  const res = await fetch(`https://localhost:7089/api/Parts/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Delete error:", text);
    throw new Error("Fel vid radering av produkt");
  }
}

// Hämta befintliga kategorier
export async function getCategories(): Promise<Category[]> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig!")

  const res = await fetch("https://localhost:7089/api/Categories", {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch categories error:", text);
    throw new Error("Kunde inte hämta kategorier");
  }

  return await res.json();
}

// Lägga till nya kategorier
export async function addCategory(category: CreateCategoryRequest): Promise<Category> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig!")

  const res = await fetch("https://localhost:7089/api/Categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(category)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Kunde inte hämta kategorier: " +text);
  }

  return await res.json();
}

// Redigera befintliga kategorier
export async function updateCategory(id: number, category: CreateCategoryRequest): Promise<void> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig!");

  const res = await fetch(`https://localhost:7089/api/Categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(category)
  });

  if (!res.ok) throw new Error("Fel vid uppdatering av kategori");
}

// Radera befintliga kategorier
export async function deleteCategory(id: number): Promise<void> {
  const token = getToken();
  if (!token) throw new Error("Ingen token tillgänglig!");

  const res = await fetch(`https://localhost:7089/api/Categories/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Fel vid radering av kategori");
}