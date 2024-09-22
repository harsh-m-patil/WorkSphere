import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Users from "./pages/Users";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/users" element={<Users />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
