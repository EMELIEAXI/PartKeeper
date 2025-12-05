
import type { Product } from "../interfaces";
import { getToken } from "../services/Authentication/auth.api";
import styles from "../styles/AdminPage.module.css"

type Props = {
  filename?: string;
};

export default function ExportToCSV({ filename = "produkter.csv" }: Props) {
  async function exportToCSV() {
    try {
      const token = getToken();
      if (!token) {
        console.error("Ingen token tillgänglig");
        return;
      }

      const res = await fetch("https://localhost:7089/api/Parts", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Fetch error:", text);
        return;
      }

      const products: Product[] = await res.json();

      if (!products || products.length === 0) {
        console.log("Ingen data att exportera");
        return;
      }

      const headers = Object.keys(products[0]).join(",");
      const rows = products
        .map(p => Object.values(p).map(v => `"${v}"`).join(",")) // citattecken runt värden
        .join("\n");

      const csvContent = headers + "\n" + rows;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Fel vid export:", err);
    }
  }

  return <button onClick={exportToCSV} className={styles.exportToSVGBtn}>Exportera alla produkter till CSV</button>;
}