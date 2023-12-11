import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import axios, { AxiosResponse } from "axios";

import Loader from "../components/Loader.component";

interface Book {
  title: string;
  author: string;
  date: number;
  picture: string;
  rate: number;
  note: string;
  genre: string;
  last_modification: any;
  modification_date: any;
}
export interface BookContextProps {
  books: Book[];
  setBooks: Dispatch<SetStateAction<Book[]>>;
}

const initialBookContext: BookContextProps = {
  books: [],
  setBooks: () => {},
};

interface BookContextProviderProps {
  children: React.ReactNode;
}

export const BookContext = createContext<BookContextProps>(initialBookContext);

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
  }, [setBooks]);

  if (books.length === 0) {
    return (
      <div className="flex items-center bg-gradient-to-b from-black to-slate-900 min-h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};
