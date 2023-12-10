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
  setRefetchData: (value: boolean) => void;
  refetchData:boolean;
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
    setRefetchData(!refetchData);
    axios
      .get<Book[]>("http://localhost:8001/api/books")
      .then((response: AxiosResponse<Book[]>) => {
        console.log("resp", response.data);
        setBooks(response.data); 
        setRefetchData(!refetchData);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des livres : ", error);
      });
  }, [setBooks, setRefetchData]);

  return (
    <BookContext.Provider value={{ books, setBooks, setRefetchData, refetchData }}>{children}</BookContext.Provider>
  );
};
