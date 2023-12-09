import React, { useContext, useEffect, useState } from 'react';
import "./App.css"
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header.component'; 
import Footer from './components/Footer.component';
import Search from './components/Search.component';
import NewBook from './components/NewBook.component';
import BooksHome from './components/BooksHome.component';
import { BookContext } from './context/BookContext';

function App() {
  const [openSearch, setOpenSearch] = useState(false);
  const [openNewBook, setOpenNewBook] = useState(false);
  const [data, setData] = useState();
  const { books, setBooks }: any = useContext(BookContext);
  
  return (
    <Router>
      <div>
        <Header setOpenSearch={setOpenSearch} setOpenNewBook={setOpenNewBook} />
        <BooksHome books={books} setData={setData} data={data} setBooks={setBooks}/>
        {openSearch && <Search />}
        {openNewBook && <NewBook setOpenNewBook={setOpenNewBook} books={books} />}
        <Footer setOpenSearch={setOpenSearch} setOpenNewBook={setOpenNewBook} />
      </div>
    </Router>
  );
}

export default App;
