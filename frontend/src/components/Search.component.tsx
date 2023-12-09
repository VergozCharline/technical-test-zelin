import React, { useContext, useEffect, useState } from 'react'
import { BookContext } from '../context/BookContext'
import axios from 'axios';

export default function Search() {
  const [searchValue, setSearchValue] = useState("")
  const [books, setBooks] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error("Error get books : ", error);
      });
  }, []);


  return (
    <section className="mt-36 lg:mx-20">
    <div className="fixed top-0 right-0 left-0 h-screen flex justify-center items-center backdrop-blur-md z-50">
    <label htmlFor="title">Rechercher</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="title"
                id="title"
                onChange={(e) => setSearchValue(e.target.value)}
                required
              />
      </div>
      </section>
  )
}
