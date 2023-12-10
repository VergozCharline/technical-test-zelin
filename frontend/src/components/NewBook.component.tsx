import axios from "axios";
import React, { useContext, useState } from "react";

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { BookContext } from "../context/BookContext";

type Props = {
  setOpenNewBook: (value: boolean) => void;
};

interface response {
  response: string | "No response";
}

export default function NewBook({ setOpenNewBook }: Props) {
  const { books, setBooks }:any = useContext(BookContext);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [picture, setPicture] = useState("");
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState("");
  const [genre, setGenre] = useState("");
  const [rate, setRate] = useState<string>();
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
      .then((response:any) => {
        if(response.status === 201){
          Swal.fire({
            title: "Livre crée avec succès",
            icon: "success"
          });
          setOpenNewBook(false);
          const newBook = response.data.book;
          setBooks([...books, newBook]);
          
        } else {
          Swal.fire({
            title: "Une erreur s'est produite",
            icon: "error"
          });
        }
      })
      .catch((error) => {
        console.error("Error created book", error);
      });
  };

  return (
    <section className="fixed top-0 right-0 left-0 h-screen flex justify-center items-center backdrop-blur-md z-50">
      <div className="w-[95%] md:w-[80%] lg:w-[70%] mx-auto shadow-xl rounded-xl bg-white border border-purple-100 py-10">
        <h2 className="px-5 lg:px-10 py-3 rounded-xl shadow-md text-center text-xl lg:text-2xl border-2 border-hoverPurple w-max mx-auto">
          Ajouter un livre
        </h2>
        <button
        type="button"
          className="absolute right-7 lg:right-[20%] top-12 lg:top-[10%] border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple"
          onClick={() => setOpenNewBook(false)}
        >
          X
        </button>
        <form
          onSubmit={submitForm}
          className="mt-10 lg:mt-20 px-5 lg:px-10 flex flex-col gap-5 lg:gap-10"
        >
          <input type="hidden" name="creationDate" value={publicationDate}  
          onChange={(e) => setPublicationDate(e.target.value)}/>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
            <div className="flex flex-col lg:w-1/2">
              <label className="text-lg font-semibold opacity-75" htmlFor="title">Titre</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="title"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col lg:w-1/2">
              <label className="text-lg font-semibold opacity-75" htmlFor="author">Auteur</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="author"
                id="author"
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col lg:w-1/2">
              <label className="text-lg font-semibold opacity-75" htmlFor="genre">Genre</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="genre"
                id="genre"
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex gap-2 lg:gap-10">
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-semibold opacity-75" htmlFor="date">Date de publication</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="date"
                id="date"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-semibold opacity-75" htmlFor="rate">Note /5</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="number"
                name="rate"
                id="rate"
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-lg font-semibold opacity-75" htmlFor="picture">Image URL</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="picture"
                id="picture"
                onChange={(e) => setPicture(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-semibold opacity-75" htmlFor="note">Commentaire</label>
            <textarea
              className="border py-1 px-2 rounded-md h-20 md:h-40"
              name="note"
              id="note"
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 border-hoverPurple rounded-md w-max px-5 lg:px-10 py-1 lg:py-2 mx-auto hover:text-white hover:bg-hoverPurple"
          >
            Valider
          </button>
        </form>
      </div>
    </section>
  );
}
