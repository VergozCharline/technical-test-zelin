import { useContext, useState } from "react";

import { BookContext } from "../context/BookContext";
import Header from "../components/Header.component";
import BookDetails from "../components/BookDetails.component";
import NewBook from "../components/NewBook.component";

type Props={
  setOpenNewBook: (value: boolean) => void;
  openNewBook: boolean;
}

export default function Search({ setOpenNewBook, openNewBook }: Props) {
  const { books }: any = useContext(BookContext);
  const [bookId, setBookId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [openBookDetails, setOpenBookDetails] = useState<boolean>(false);

  const searchBookByTitle = books.filter((book: any) =>
    book.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  const getBookId = (id: any) => {
    setBookId(id);
    setOpenBookDetails(true);
  };

  return (
    <section className="bg-gradient-to-b from-black to-slate-900 min-h-[100vh]">
      <Header setOpenNewBook={setOpenNewBook} />
      {openNewBook && <NewBook setOpenNewBook={setOpenNewBook} />}
      <div className="flex flex-col justify-center items-center pt-36 pb-20 px-7 md:px-20 ">
        <label htmlFor="search" className="text-lg font-semibold opacity-75 text-textPurple">
          Vous cherchez un livre ?
        </label>
        <input
          className="border py-1 px-2 rounded-md bg-gradient-to-b from-black to-slate-900 text-textPurple"
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        <div className="flex flex-wrap gap-3 md:gap-8 mt-10 md:mt-20 items-center justify-center">
          {searchValue
            ? searchBookByTitle.map((book: any) => (
                <button type="button" onClick={() => getBookId(book._id)}>
                  <img
                      className="rounded-md w-24 h-36 md:w-32 md:h-48"
                    src={book.picture}
                    alt={book.title}
                  />
                </button>
              ))
            : books.map((allBooks: any) => (
                <button type="button" onClick={() => getBookId(allBooks._id)}>
                  <img
                      className="rounded-md w-24 h-36 md:w-32 md:h-48"
                    src={allBooks.picture}
                    alt={allBooks.title}
                  />
                </button>
              ))}
        </div>
      </div>
      {openBookDetails && (
        <BookDetails setOpenBookDetails={setOpenBookDetails} bookId={bookId} />
      )}
    </section>
  );
}
