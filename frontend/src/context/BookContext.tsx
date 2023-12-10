// BookContext.tsx
import React, { createContext, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

// Définition du type pour un livre
interface Book {
  id: number;
  title: string;
  author: string;
  date: string;
  rate: number;
  note: string;
  genre: string;
  last_modification: string;
  modification_date: string;
}

interface BookContextProps {
  books: Book[];
  setBooks: any;
}

interface BookContextProviderProps {
  children: React.ReactNode;
}

export const BookContext = createContext<BookContextProps | null>(null);

export const BookContextProvider: React.FC<BookContextProviderProps> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    axios
      .get<Book[]>("http://localhost:8001/api/books")
      .then((response: AxiosResponse<Book[]>) => {
        setBooks(response.data); 
        console.log("resp", response.data);
        setRefetchData(!refetchData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livres : ", error);
      });
  }, [setBooks]);

  return (
    <BookContext.Provider value={{ books, setBooks }}>{children}</BookContext.Provider>
  );
};
