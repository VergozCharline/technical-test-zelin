import { useContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import { BookContext } from "./context/BookContext";
import Search from "./pages/search";
import HomePage from "./pages/homePage";

function App() {
  const [openNewBook, setOpenNewBook] = useState(false);
  const { books, setBooks }: any = useContext(BookContext);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/">
            <Route
              path="/"
              element={
                <HomePage
                  books={books}
                  setOpenNewBook={setOpenNewBook}
                  openNewBook={openNewBook}
                  setBooks={setBooks}
                />
              }
            />
            <Route path="/search" element={<Search books={books} setOpenNewBook={setOpenNewBook} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
