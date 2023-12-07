import React from "react";

type Props = {
  setOpenNewBook: (value: boolean) => void;
};

export default function NewBook({ setOpenNewBook }: Props) {
  return (
    <section className="fixed top-0 right-0 left-0 h-screen flex justify-center items-center backdrop-blur-md">
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
        <form className="mt-10 lg:mt-20 px-5 lg:px-10 flex flex-col gap-5 lg:gap-10">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
          <div className="flex flex-col lg:w-1/2">
            <label>Titre</label>
            <input
              className="border py-1 px-2 rounded-md"
              type="text"
              name="title"
              id="title"
              required
            />
          </div>
          <div className="flex flex-col lg:w-1/2">
            <label>Auteur</label>
            <input
              className="border py-1 px-2 rounded-md"
              type="text"
              name="author"
              id="author"
              required
            />
          </div>
          </div>
          <div className="flex gap-2 lg:gap-10">
          <div className="flex flex-col w-1/2">
            <label>Date de publication</label>
            <input
              className="border py-1 px-2 rounded-md"
              type="text"
              name="date"
              id="date"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label>Note /5</label>
            <input
              className="border py-1 px-2 rounded-md"
              type="number"
              name="rate"
              id="rate"
              required
            />
          </div>
          </div>
          <div className="flex flex-col">
            <label>Commentaire</label>
            <textarea
              className="border py-1 px-2 rounded-md h-40"
              name="note"
              id="note"
              required
            />
          </div>
          <button
          className="border-2 border-hoverPurple rounded-md w-max px-5 lg:px-10 py-1 lg:py-2 mx-auto hover:text-white hover:bg-hoverPurple"
          onClick={() => setOpenNewBook(false)}
        >
          Valider
        </button>
        </form>
      </div>
    </section>
  );
}
