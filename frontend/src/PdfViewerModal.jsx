import React from "react";

export default function PdfViewerModal({ url, onClose }) {
  if (!url) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button style={styles.closeBtn} onClick={onClose}>Close ✕</button>

        <iframe
          src={url}
          title="PDF Viewer"
          style={{ width: "100%", height: "90%" }}
        ></iframe>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    width: "80%",
    height: "90%",
    background: "white",
    borderRadius: "8px",
    padding: "10px",
    position: "relative"
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "10px",
    padding: "8px 12px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  }
};
