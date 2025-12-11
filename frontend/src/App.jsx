import "./App.css";
import UploadForm from "./UploadForm";
import DocumentList from "./DocumentList";

function App() {
  return (
    <div className="app-container">
      <h1>Patient Document Portal</h1>
      <UploadForm />
      <DocumentList />
    </div>
  );
}

export default App;
