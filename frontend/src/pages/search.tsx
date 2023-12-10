import { useState } from "react";

import Header from "../components/Header.component";

export default function Search({ books, setOpenNewBook }: any) {
  const [searchValue, setSearchValue] = useState("");

  const searchBookByTitle = books.filter((book: any) =>
    book.title.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  return (
    <section className="">
        <Header setOpenNewBook={setOpenNewBook}/>
      <div className="flex flex-col justify-center items-center mt-36 mb-20 mx-7 md:mx-20 ">
        <label htmlFor="search" className="text-lg font-semibold opacity-75">Vous cherchez un livre ?</label>
        <input
          className="border py-1 px-2 rounded-md"
          type="text"
          name="search"
          id="search"
          onChange={(e) => setSearchValue(e.target.value)}
          required
        />
        <div className="flex flex-wrap gap-8 mt-10 md:mt-20 items-center justify-center">
          {searchValue
            ? searchBookByTitle.map((book: any) => (
                <img
                  className="rounded-md"
                  src={book.picture}
                  alt={book.title}
                  width={150}
                  height={150}
                />
              ))
            : books.map((allBooks: any) => (
                <img
                  className="rounded-md"
                  src={allBooks.picture}
                  alt={allBooks.title}
                  width={150}
                  height={150}
                />
              ))}
        </div>
      </div>
    </section>
  );
}
