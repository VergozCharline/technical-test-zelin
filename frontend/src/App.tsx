import React, { useState } from 'react';
import "./App.css"
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header.component'; 
import Footer from './components/Footer.component';
import Search from './components/Search.component';
import NewBook from './components/NewBook.component';
import MyBooks from './components/MyBooks.component';
import BooksHome from './components/BooksHome.component';

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNewBook, setOpenNewBook] = useState(false);
  return (
    <Router>
      <div>
        <Header setOpenSearch={setOpenSearch} setOpenNewBook={setOpenNewBook} />
        {/* <MyBooks /> */}
        <BooksHome />
        {openSearch && <Search />}
        {openNewBook && <NewBook setOpenNewBook={setOpenNewBook} />}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
