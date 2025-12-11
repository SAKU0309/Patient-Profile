📄 Patient Medical Document Portal — README.md
📌 Project Overview

This is a full-stack patient document portal where users (patients) can:

Upload PDF medical documents

View all uploaded documents

Download individual documents

Delete documents when no longer needed

The application includes a React.js frontend, Node.js + Express backend, SQLite database, and local file storage for PDF files.
It runs fully locally and is designed as a simple, single-user system.

📁 Folder Structure
'''
patient-portal/
│
├── frontend/        # React.js application (UI)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/         # Node.js + Express API server
│   ├── server.js
│   ├── uploads/     # All PDF files stored here
│   ├── db.sqlite    # SQLite database file
│   └── package.json
│
└── README.md
'''
🛠️ Tech Stack
Frontend

React.js (Vite)

Axios

Tailwind or basic CSS (optional)

Backend

Node.js + Express.js

Multer (file upload handling)

SQLite (database)

CORS middleware

Storage

Local uploads/ folder for PDFs

🚀 How to Run Locally (End-to-End)
1️⃣ Clone the Repository
git clone https://github.com/your-username/patient-portal.git
cd patient-portal

2️⃣ Setup Backend
cd backend
npm install


Start the server:

npm start


Backend will run at:
👉 http://localhost:5000

This will automatically create:

uploads/ folder

db.sqlite database

3️⃣ Setup Frontend

In another terminal:

cd frontend
npm install
npm run dev


Frontend will run at:
👉 http://localhost:5173
 (or whichever Vite port)

🎯 How the Application Works
Upload a PDF

User selects a PDF file

React sends it to Express backend via /documents/upload

Backend:

Validates file format

Stores file in uploads/ folder

Saves metadata in SQLite (db.sqlite)

Frontend refreshes the document list

List Documents

Frontend calls /documents

Backend returns JSON metadata list

Download File

React calls GET /documents/:id

Backend streams the PDF file

Delete File

React calls DELETE /documents/:id

Backend:

Deletes file from uploads/

Removes DB entry

🔗 API Specification & Example Calls
1️⃣ Upload a PDF
Endpoint

POST /documents/upload

curl Example
curl -X POST -F "file=@test.pdf" http://localhost:5000/documents/upload

Response
{
  "success": true,
  "message": "File uploaded"
}

2️⃣ List All Documents
Endpoint

GET /documents

curl Example
curl http://localhost:5000/documents

Response
[
  {
    "id": 1,
    "filename": "report.pdf",
    "filesize": 204800,
    "created_at": "2025-01-20T12:00:00Z"
  }
]

3️⃣ Download a Document
Endpoint

GET /documents/:id

curl Example
curl -O http://localhost:5000/documents/1

4️⃣ Delete a Document
Endpoint

DELETE /documents/:id

curl Example
curl -X DELETE http://localhost:5000/documents/1

Response
{
  "success": true,
  "message": "File deleted"
}

📌 Notes & Assumptions

Only PDF files are accepted

Max file size: 10 MB

No authentication; single-user system

SQLite is lightweight and ideal for local use

Files are stored locally in backend/uploads/

🏁 Final Output

After starting both frontend & backend:

Visit: http://localhost:5173

Upload PDF files

See them listed on screen

Download or delete with one click

Fully working patient portal 🎉
