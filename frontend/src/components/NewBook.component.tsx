import axios from "axios";
import React, { useContext, useState } from "react";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { BookContext, BookContextProps } from "../context/BookContext";

type Props = {
  setOpenNewBook: (value: boolean) => void;
};

interface response {
  response: string | "No response";
}

export default function NewBook({ setOpenNewBook }: Props) {
  const { books, setBooks }:BookContextProps = useContext(BookContext);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [picture, setPicture] = useState<string>("");
  const [date, setDate] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [rate, setRate] = useState<number>(0);
  const [publicationDate, setPublicationDate] = useState<string>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post<response>("http://localhost:8001/api/books", {
        title,
        author,
        picture,
        date,
        note,
        genre,
        rate,
        publicationDate,
      })
      .then((response: any) => {
        if (response.status === 201) {
          Swal.fire({
            title: "Livre crée avec succès",
            icon: "success",
            customClass: {
              popup: "bg-popup",
            },
          });
          setOpenNewBook(false);
          const newBook = response.data.book;
          setBooks([...books, newBook]);
        } else {
          Swal.fire({
            title: "Une erreur s'est produite",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.error("Error created book", error);
      });
  };

  return (
    <section className="fixed top-0 right-0 bottom-0 left-0 h-screen flex justify-center items-center backdrop-blur-md z-[999] max-md:overflow-y-scroll">
      <div className="relative w-[95%] md:w-[80%] max-md:h-[90vh] max-md:overflow-y-scroll lg:w-[70%] mx-auto shadow-xl rounded-xl bg-white border border-purple-100 py-10 bg-gradient-to-b from-black to-slate-900">
        <h2 className="px-5 lg:px-10 py-3 rounded-xl shadow-md text-center text-xl lg:text-3xl font-bold opacity-80 w-max mx-auto text-textPurple border-b">
          Ajouter un livre
        </h2>
        <button
          type="button"
          className="absolute right-7 lg:right-[7%] top-12 lg:top-[7%] border rounded-full px-3 py-1 hover:text-white hover:bg-colorBorder text-textPurple"
          onClick={() => setOpenNewBook(false)}
        >
          X
        </button>
        <form
          onSubmit={submitForm}
          className="mt-10 lg:mt-20 px-5 lg:px-10 flex flex-col gap-5 lg:gap-10"
        >
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
                className="border py-1 px-2 rounded-md bg-gradient-to-b from-black to-slate-900 text-textPurple"
                type="text"
                name="title"
                id="title"
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
                className="bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="text"
                name="author"
                id="author"
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
                className="bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="text"
                name="genre"
                id="genre"
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-2 lg:gap-10">
            <div className="flex flex-col w-full md:w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="date"
              >
                Publié en
              </label>
              <input
                className="bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="number"
                name="date"
                id="date"
                 onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setDate(value);
                  }
                }}
                required
              />
            </div>

            <div className="flex flex-col w-full md:w-1/2">
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
            <div className="flex flex-col w-full md:w-1/2">
              <label
                className="text-textPurple text-lg font-semibold opacity-75"
                htmlFor="picture"
              >
                Image URL
              </label>
              <input
                className="bg-gradient-to-b from-black to-slate-900 text-textPurple border py-1 px-2 rounded-md"
                type="text"
                name="picture"
                id="picture"
                onChange={(e) => setPicture(e.target.value)}
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
              className="border py-1 px-2 rounded-md h-20 md:h-40 bg-gradient-to-b from-black to-slate-900 text-textPurple"
              name="note"
              id="note"
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 text-textPurple font-bold border-textPurple rounded-md w-max px-5 lg:px-10 py-1 lg:py-2 mx-auto hover:text-white hover:bg-colorBorder"
          >
            Valider
          </button>
        </form>
      </div>
    </section>
  );
}
