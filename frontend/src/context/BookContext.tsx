// BookContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios, { AxiosResponse } from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  date: string;
  rate: number;
  note: string;
  last_modification: string;
  modification_date: string;
}

interface BookContextProps {
  books: Book[];
}

interface BookContextProviderProps {
  children: React.ReactNode;
}

export const BookContext = createContext<BookContextProps | null>(null);

export const BookContextProvider: React.FC<BookContextProviderProps> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    axios
      .get<Book[]>("http://localhost:8001/api/books")
      .then((response: AxiosResponse<Book[]>) => {
        setBooks(response.data); 
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livres : ", error);
      });
  }, []);

  return (
    <BookContext.Provider value={{ books }}>{children}</BookContext.Provider>
  );
};
