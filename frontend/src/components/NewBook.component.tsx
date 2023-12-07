import axios from "axios";
import React, { useState } from "react";

type Props = {
  setOpenNewBook: (value: boolean) => void;
};

interface response {
  response: string | "No response";
}

export default function NewBook({ setOpenNewBook }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState<string>("");
  const [note, setNote] = useState("");
  const [rate, setRate] = useState<string>();
  const [publicationDate, setPublicationDate] = useState<string>();

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post<response>("http://localhost:8001/api/books", {
        title,
        author,
        date,
        note,
        rate,
        publicationDate
      })
      .then((response:any) => {
        console.log(response);
        if(response.status === 201){
          alert("ok")
          setOpenNewBook(false)
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
          Ajouter un livre
        </h2>
        <button
          className="absolute right-7 lg:right-[20%] top-12 lg:top-[23%] border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple"
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
              <label htmlFor="title">Titre</label>
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
              <label htmlFor="author">Auteur</label>
              <input
                className="border py-1 px-2 rounded-md"
                type="text"
                name="author"
                id="author"
                onChange={(e) => setAuthor(e.target.value)}
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
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 border-hoverPurple rounded-md w-max px-5 lg:px-10 py-1 lg:py-2 mx-auto hover:text-white hover:bg-hoverPurple"
            // onClick={() => setOpenNewBook(false)}
          >
            Valider
          </button>
        </form>
      </div>
    </section>
  );
}
