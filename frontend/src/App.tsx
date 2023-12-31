import { useContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Search from "./pages/search";
import HomePage from "./pages/homePage";

function App() {
  const [openNewBook, setOpenNewBook] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/">
            <Route
              path="/"
              element={
                <HomePage
                  setOpenNewBook={setOpenNewBook}
                  openNewBook={openNewBook}
                />
              }
            />
            <Route
              path="/search"
              element={
                <Search
                  setOpenNewBook={setOpenNewBook}
                  openNewBook={openNewBook}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
