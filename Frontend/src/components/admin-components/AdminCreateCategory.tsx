import styles from "../../styles/AdminCreateUser.module.css"
import { useEffect, useState } from "react";
import type { CreateCategoryRequest } from "../../interfaces/CreateCategoryRequest";
import type { Category } from "../../interfaces";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../../services/Parts/parts.api";

export default function AdminCreateCategory() {
  const [formData, setFormData] = useState<CreateCategoryRequest>({categoryName: ""});

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [topMessage, setTopMessage] = useState("");
  const [bottomMessage, setBottomMessage] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = async (): Promise<Category[]> => {
    return await getCategories();
  };

  // --- useEffect: kör async IIFE och sätt state här (så ESLint blir nöjd) ---
  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const data = await fetchCategories();
        if (mounted) setCategories(data);
      } catch (err) {
        console.error(err);
        if (mounted) setBottomMessage("Kunde inte hämta leverantörer.");
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Hantera input i formulär
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Skapa ny kategori
  async function handleSubmit (e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTopMessage("");

    try {
      await addCategory(formData);
      setTopMessage("✔️ Leverantör tillagd!");
      setFormData({ categoryName: "" });
      setCategories (await fetchCategories());
    } catch (err) {
      setTopMessage("❌ Fel vid skapande av leverantör.");
      console.error(err);
    }

    setTimeout(() => {
      setTopMessage("");
    }, 5000);

    setLoading(false);
  }

  // Starta redigering
  function startEdit(category: Category) {
    setEditingId(category.categoryId);
    setEditName(category.categoryName);
  }

  // Spara redigering
  async function saveEdit(id: number) {
    try {
      await updateCategory(id, { categoryName: editName });
      setBottomMessage("✔️ Leverantör uppdaterad!");
      setEditingId(null);
      setCategories (await fetchCategories());
    } catch (err) {
      console.error(err);
      setBottomMessage("❌ Fel vid uppdatering.");
    }

    setTimeout(() => {
      setBottomMessage("");
    }, 5000);
  }

  // Radera en kategori
  async function removeCategory(id: number) {
    if (!confirm("Är du säker på att du vill radera denna kategori?")) return;

    try {
      await deleteCategory(id);
      setBottomMessage("✔️ Leverantör raderad!");
      setCategories (await fetchCategories());
    } catch (err) {
      console.error(err);
      setBottomMessage("❌ Fel vid radering.");
    }

  }

  return (
    <div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <h2>Lägg till leverantörer</h2>
        
        <fieldset className={styles.adminFieldset}>

          <div className={styles.formColumn}>
            <label htmlFor="categoryName">Leverantörsnamn: </label>
            <input 
            type="text"
            id="categoryName"
            name="categoryName"
            placeholder="Leverantör..."
            value={formData?.categoryName}
            onChange={handleChange}
            required />
          </div>

          <div className={styles.formColumn}>
            <button type="submit" disabled={loading}>
              {loading ? "Skapar..." : "Lägg till leverantör"}
            </button>
          </div>

          {topMessage && <p>{topMessage}</p>}
        </fieldset>
      </form>

      {/* LISTA BEFINTLIGA KATEGORIER */}
      <div className={styles.formWrapper}>
        <h3>Befintliga leverantörer</h3>
        <div className={styles.adminTableHeader}>
          <div>ID</div>
          <div>Namn</div>
          <div>Åtgärder</div>
        </div>

        {categories.map(cat => (
          <div key={cat.categoryId} className={styles.adminTableRow}>
            <div>{cat.categoryId}</div>
            <div>{cat.categoryName}</div>
            <div className={styles.crudBtns}>
              <button className={styles.editBtn} onClick={() => startEdit(cat)}>Ändra</button>
              <button className={styles.deleteBtn} onClick={() => removeCategory(cat.categoryId)}>X</button>
            </div>
          </div>
        ))}

        {editingId !== null && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <label htmlFor="editName"><h3>Redigera leverantörsnamn</h3></label>
              <input
                type="text"
                id="editName"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <div>
                <button className={styles.saveBtn} onClick={() => saveEdit(editingId)}>Spara</button>
                <button className={styles.cancleBtn} onClick={() => setEditingId(null)}>Avbryt</button>
              </div>
            </div>
          </div>
        )}

        {bottomMessage && <p className={styles.message}>{bottomMessage}</p>}
      </div>
    </div>
  )
}