import axios from "axios";
import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { BookContext } from "../context/BookContext";

type Props = {
  setOpenUpdateBook: (value: boolean) => void;
  bookId: any;
};

interface response {
  response: string | "No response";
}

export default function UpdateBook({ setOpenUpdateBook, bookId }: Props) {
  const { books, setBooks }: any = useContext(BookContext);

  const mapInfos = books.filter(
    (bookIdUpdate: any) => bookIdUpdate._id === bookId
  )[0];

  const [title, setTitle] = useState<string>(mapInfos.title || "");
  const [author, setAuthor] = useState<string>(mapInfos.author || "");
  const [date, setDate] = useState<number>(mapInfos.date || "");
  const [note, setNote] = useState<string>(mapInfos.note || "");
  const [genre, setGenre] = useState<string>(mapInfos.genre || "");
  const [rate, setRate] = useState<number>(mapInfos.rate || "");
  const [picture, setPicture] = useState<string>(mapInfos.picture || "");
  const [publicationDate, setPublicationDate] = useState<string>();

  const currentDate = new Date();
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .patch<response>(`http://localhost:8001/api/books/${bookId}`, {
        title,
        author,
        picture,
        date,
        note,
        genre,
        rate,
        lastModification: currentDate,
      })
      .then((response: any) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Modifications enregistrées",
            icon: "success",
          });
          if (bookId === response.data.book._id) {
            setBooks((prevBooks: any) => {
              const updatedBooks = prevBooks.map((book: any) => {
                if (book._id === response.data.book._id) {
                  return {
                    ...book,
                    title: response.data.book.title,
                    author: response.data.book.author,
                    picture: response.data.book.picture,
                    date: response.data.book.date,
                    note: response.data.book.note,
                    genre: response.data.book.genre,
                    rate: response.data.book.rate,
                    lastModification: response.data.book.lastModification,
                  };
                }
                return book;
              });
              return updatedBooks;
            });
          }
          setOpenUpdateBook(false);
        } else {
          Swal.fire({
            title: "Une erreur s'est produite",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error updating book", error);
      });
  };

  return (
    <section className="flex justify-center items-center backdrop-blur-md z-50 ">
      <div className=" relative w-full mx-auto shadow-xl rounded-md bg-gradient-to-b from-black to-slate-900 border border-purple-100 py-10 max-md:h-[90vh] max-md:overflow-y-scroll">
        <button
          type="button"
          className="absolute right-7 lg:right-[8%] top-12 lg:top-[9%] border rounded-full px-3 py-1 hover:bg-colorBorder  text-textPurple"
          onClick={() => setOpenUpdateBook(false)}
        >
          X
        </button>
        <form
          onSubmit={submitForm}
          className="px-5 lg:px-10 flex flex-col gap-5 lg:gap-7"
        >
          <div className="flex justify-evenly items-center">
            <img
              className="rounded-md max-md:w-20 max-md:mr-2 mb-5"
              src={mapInfos.picture}
              alt={mapInfos.title}
              width={150}
              height={150}
            />
            <div className="flex flex-col">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="picture"
              >
                Image URL
              </label>
              <input
                className="border py-1 px-2 rounded-md bg-gradient-to-b from-black to-slate-900 text-textPurple"
                type="text"
                name="picture"
                id="picture"
                value={picture}
                onChange={(e) => setPicture(e.target.value)}
                required
              />
            </div>
          </div>
          <input
            type="hidden"
            name="creationDate"
            value={publicationDate}
            onChange={(e) => setPublicationDate(e.target.value)}
          />
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
            <div className="flex flex-col lg:w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="title"
              >
                Titre
              </label>
              <input
                className=" bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder={mapInfos.title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col lg:w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="author"
              >
                Auteur
              </label>
              <input
                className=" bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="text"
                name="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col lg:w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="genre"
              >
                Genre
              </label>
              <input
                className=" bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="text"
                name="genre"
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2 lg:gap-10">
            <div className="flex flex-col w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="date"
              >
                Publié en
              </label>
              <input
                className=" bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="number"
                name="date"
                id="date"
                value={date}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setDate(value);
                  }
                }}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="rate"
              >
                Note /5
              </label>
              <input
                className=" bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="number"
                name="rate"
                id="rate"
                value={rate}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value <= 5) {
                    setRate(value);
                  } else {
                    setRate(5);
                  }
                }}
                max="5"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label
              className="text-textPurple text-lg font-semibold opacity-75"
              htmlFor="note"
            >
              Commentaire
            </label>
            <textarea
              className="bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md h-28 max-h-40"
              name="note"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 text-textPurple border-textPurple rounded-md w-max px-5 lg:px-10 py-1 lg:py-2 mx-auto hover:text-white hover:bg-colorBorder font-bold"
          >
            Valider
          </button>
        </form>
      </div>
    </section>
  );
}
