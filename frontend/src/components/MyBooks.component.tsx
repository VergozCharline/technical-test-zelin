import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MyBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/books").then((data) => {
      console.log(data);
      setBooks(data?.data);
    });
  }, []);

  return (
    <div className="mt-36 mx-20">
      <h1 className="text-xl mx-auto text-center mb-10">Mes livres</h1>
      {books.map((myBooks: any, i: number) => (
        <>
          <img className="absolute opacity-40 -z-10 scale-150 mx-auto" src="/decoration.webp" alt="" width={300} height={300}/>
        <div key={i} className="border rounded-md px-5 py-5 w-96 h-72 overflow-y-scroll z-10">
          <div>
            <p className="text-lg underline-offset-4 underline">Titre</p>
            <p>{myBooks.title}</p>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <p className="text-lg underline-offset-4 underline">Auteur</p>
              <p>{myBooks.author}</p>
            </div>
            <div>
              <p className="text-lg underline-offset-4 underline">
                Date de publication
              </p>
              <p>{myBooks.date}</p>
            </div>
          </div>
          <div>
            <p className="text-lg underline-offset-4 underline">Note</p>
            <p>{myBooks.rate}</p>
          </div>
          <div>
            <p className="text-lg underline-offset-4 underline">Commentaire</p>
            <p>{myBooks.note}</p>
          </div>
        </div>
        </>
      ))}
    </div>
  );
}
