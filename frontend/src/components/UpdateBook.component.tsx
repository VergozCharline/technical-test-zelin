import axios from "axios";
import React, { useState } from "react";

import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

type Props = {
  setOpenUpdateBook: (value: boolean) => void;
  books: any;
  bookId: any;
};

interface response {
  response: string | "No response";
}

export default function UpdateBook({ setOpenUpdateBook, bookId, books }: Props) {
const mapInfos = books.filter((bookIdUpdate:any) => bookIdUpdate._id === bookId)[0];

  const [title, setTitle] = useState(mapInfos.title || "");
  const [author, setAuthor] = useState(mapInfos.author || "");
  const [date, setDate] = useState<string>(mapInfos.date || "");
  const [note, setNote] = useState(mapInfos.note || "");
  const [genre, setGenre] = useState(mapInfos.genre || "");
  const [rate, setRate] = useState<string>(mapInfos.rate || "");
  const [publicationDate, setPublicationDate] = useState<string>();

  console.log(books);
  

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      axios
      .put<response>(`http://localhost:8001/api/books/${bookId}`, {
        title,
        author,
        date,
        note,
        genre,
        rate,
        publicationDate
      })
      .then((response:any) => {
        console.log(response);
        if(response.status === 200){
          Swal.fire({
            title: "Modifications enregistrées",
            icon: "success"
          });
          setOpenUpdateBook(false);
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
      <div className="w-[95%] md:w-[80%] lg:w-[70%] h-[95vh] lg:h-[60vh] mx-auto shadow-xl rounded-xl bg-white border border-purple-100">
        <h2 className="px-5 lg:px-10 py-3 mt-14 rounded-xl shadow-md text-center text-xl lg:text-2xl border-2 border-hoverPurple w-max mx-auto">
          Modifier le livre
        </h2>
        <button
        type="button"
          className="absolute right-7 lg:right-[20%] top-12 lg:top-[23%] border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple"
          onClick={() => setOpenUpdateBook(false)}
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
              <label htmlFor="title">Titre</label>
              <input
                className="border py-1 px-2 rounded-md"
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
              <label htmlFor="author">Auteur</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="author"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col lg:w-1/2">
              <label htmlFor="genre">Genre</label>
              <input
                className="border py-1 px-2 rounded-md"
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
              <label htmlFor="date">Date de publication</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label htmlFor="rate">Note /5</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="number"
                name="rate"
                id="rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="note">Commentaire</label>
            <textarea
              className="border py-1 px-2 rounded-md h-40"
              name="note"
              id="note"
              value={note}
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
