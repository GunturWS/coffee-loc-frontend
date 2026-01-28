import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/layout/Layout";
import Header from "./components/layout/Header";
import HomePage from "./pages/Home/index";
import ExplorePage from "./pages/ExplorePage/index";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
        <Route index element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/coffee-shop/:id" element={<DetailPage />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
