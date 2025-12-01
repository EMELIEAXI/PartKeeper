import styles from "../../styles/ConfirmModal.module.css";

type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({ title, message, onConfirm, onCancel }: ConfirmModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>Avbryt</button>
          <button className={styles.confirmBtn} onClick={onConfirm}>Ja</button>
        </div>
      </div>
    </div>
  );
}