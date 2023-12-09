import { useContext } from "react";

// import { BookContext } from "../context/BookContext";

export default function MyBooks({ books }:any) {
  // const { books }: any = useContext(BookContext);

  return (
    <div className="mt-36 lg:mx-20">
      <h1 className="text-xl mx-auto text-center mb-10">Mes livres</h1>
      <div className="flex flex-wrap gap-5">
        {books.map((myBooks: any) => (
            <div
              key={myBooks._id}
              className="border rounded-md px-5 py-5 w-full mx-2 md:mx-auto lg:w-96 h-80 overflow-y-scroll lg:overflow-y-auto z-10"
            >
            <img
              className="absolute opacity-30 -z-10 scale-110 mx-auto"
              src="/decoration.webp"
              alt=""
              width={300}
              height={300}
            />
              <div>
                <p className="text-lg underline-offset-4 underline">Titre</p>
                <p>{myBooks.title}</p>
              </div>
              <div className="flex gap-2">
                <div className="w-1/2">
                  <p className="text-lg underline-offset-4 underline">Auteur</p>
                  <p>{myBooks.author}</p>
                </div>
                <div>
                  <p className="text-lg underline-offset-4 underline">
                    Date de publication
                  </p>
                  <p>{myBooks.date}</p>
                </div>
              </div>
              <div>
                <p className="text-lg underline-offset-4 underline">Note</p>
                <p>{myBooks.rate}</p>
              </div>
              <div>
                <p className="text-lg underline-offset-4 underline">
                  Commentaire
                </p>
                <p>{myBooks.note}</p>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
}
