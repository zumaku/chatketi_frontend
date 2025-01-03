import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat, Home, ComingSoon, NotFound } from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sekilas" element={<ComingSoon />} />
        <Route path="/testimoni" element={<ComingSoon />} />
        <Route path="/docs" element={<ComingSoon />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
