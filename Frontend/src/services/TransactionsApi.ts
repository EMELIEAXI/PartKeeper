export const API_BASE = "https://localhost:7089/api/transactions";

export interface CreateTransactionPayload {
    productId: number;
    quantityChange: number;
    transactionType: "Add" | "Remove";
    comment?: string;
}

export interface Transaction {
    transactionId: number;
    productId: number;
    quantityChange: number;
    transactionType: string;
    comment: string | null;
    transactionDate: string;
}

function getToken(): string | null {
  return localStorage.getItem("token");
}

export async function getTransactions(): Promise<Transaction[]> {
    const token = getToken();

    const response = await fetch(API_BASE, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Kunde inte hämta transaktioner");
    }

    return response.json() as Promise<Transaction[]>;
}

export async function createTransaction(
    payload: CreateTransactionPayload
): Promise<Transaction> {

    const token = getToken();

    const response = await fetch(API_BASE, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error("Kunde inte skapa transaktion: " + text);
    }

    return response.json() as Promise<Transaction>;
}
