# 📄 Patient Medical Document Portal

## 📌 Project Overview

This is a full-stack **Patient Medical Document Portal** where users (patients) can:

- Upload PDF medical documents  
- View all uploaded documents  
- Download individual documents  
- Delete documents when no longer needed  

The application includes:

- **React.js** frontend  
- **Node.js + Express** backend  
- **SQLite database**  
- **Local PDF file storage**  

It runs completely locally and is designed as a simple **single-user system**.

---

## 📁 Folder Structure
```
patient-portal/
│
├── frontend/ # React.js application (UI)
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── backend/ # Node.js + Express API server
│ ├── server.js
│ ├── uploads/ # All PDF files stored here
│ ├── db.sqlite # SQLite database file
│ └── package.json
│
└── README.md
```
---

## 🛠️ Tech Stack

### **Frontend**
- React.js (Vite)
- Axios
- Basic CSS 

### **Backend**
- Node.js + Express.js
- SQLite database

### **Storage**
- Local `uploads/` folder for PDFs

---

## 🚀 How to Run Locally (End-to-End)

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-username/patient-portal.git
cd patient-portal
```
2️⃣ Setup Backend
```
cd backend
npm install
npm start
```

Backend runs at:
```
👉 http://localhost:5000
```
This will automatically create:
```
uploads/ folder

db.sqlite database
```
3️⃣ Setup Frontend

In another terminal:
```
cd frontend
npm install
npm run dev
```

Frontend runs at:
```
👉 http://localhost:5173
```
(or whichever Vite port)

🎯 How the Application Works
1. Upload a PDF

    User selects a PDF

    React sends it to Express (/documents/upload)

Backend:
```
Validates file type

Saves file to uploads/

Inserts metadata into SQLite

Frontend refreshes the document list
```
2. List All Documents

    Frontend calls /documents

    Backend returns all stored PDF metadata

3. Download a File

    React calls: GET /documents/:id

    Backend streams the PDF for download

4. Delete a File

    React calls: DELETE /documents/:id

Backend:
```
Removes file from uploads/

Deletes row from SQLite DB
```
🔗 API Specification & Example Calls
1️⃣ Upload a PDF

Endpoint
```
POST /documents/upload
```

curl Example
```
curl -X POST -F "file=@test.pdf" http://localhost:5000/documents/upload

```
Response
```
{
  "success": true,
  "message": "File uploaded"
}
```
2️⃣ List All Documents

Endpoint
```
GET /documents
```

curl Example
```
curl http://localhost:5000/documents
```

Response
```
[
  {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 204800,
    "created_at": "2025-01-20T12:00:00Z"
  }
]
```
3️⃣ Download a Document

Endpoint
```
GET /documents/:id
```

curl Example
```
curl -O http://localhost:5000/documents/1
```
4️⃣ Delete a Document

Endpoint
```
DELETE /documents/:id

```
curl Example
```
curl -X DELETE http://localhost:5000/documents/1
```

Response
```
{
  "success": true,
  "message": "File deleted"
}
```
📌 Notes & Assumptions

  Only PDF files are accepted

  No authentication (single-user system)

  SQLite is ideal for local applications

  Files are stored in backend/uploads/

🏁 Final Output

Once both frontend & backend are running:
```
👉 Visit: http://localhost:5173
```
You can now:

    Upload PDF medical documents

    View all uploaded files

    Download any file

    Delete files with one click

A fully working local patient document management portal 🎉
