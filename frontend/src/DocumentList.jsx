import React, { useEffect, useState } from "react";
import axios from "axios";


const DocumentList = () => {
  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    const res = await axios.get("http://localhost:5000/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
    window.addEventListener("fileUploaded", fetchDocuments);
    return () => window.removeEventListener("fileUploaded", fetchDocuments);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;
    await axios.delete(`http://localhost:5000/documents/${id}`);
    fetchDocuments();
  };

  return (
    <div>
      <h3>Uploaded Documents</h3>
      {documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul>
          {documents.map((doc) => (
            <li key={doc.id}>
              {doc.filename} ({(doc.filesize / 1024).toFixed(2)} KB) -{" "}
              <a href={`http://localhost:5000/documents/${doc.id}`} target="_blank" rel="noreferrer">Download</a> |{" "}
              <button onClick={() => handleDelete(doc.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
