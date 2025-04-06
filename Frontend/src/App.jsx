import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "./pages/NotFound/NotFound";

import MainHome from "./pages/Home/MainHome";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<MainHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
