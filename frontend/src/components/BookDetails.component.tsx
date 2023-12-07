import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

type Props = {
    setOpenBookDetails: (value: boolean) => void;
    books: any;
    bookId: any;
  };

export default function BookDetails({ setOpenBookDetails, bookId, books }:Props) {

  return (
    <section className="mt-36 lg:mx-20">
    <div className="fixed top-0 right-0 left-0 h-screen flex justify-center items-center backdrop-blur-md z-50">
        <button
          className="absolute right-7 lg:right-[20%] top-12 lg:top-[18%] border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple z-50"
          onClick={() => setOpenBookDetails(false)}
        >
          X
        </button>
        <div className="flex flex-wrap gap-5 w-full h-[70vh]">
        {books.filter((myBooks: any) => myBooks._id === bookId).map((myBooks: any) => (
            <div
              key={myBooks._id}
              className="bg-white border rounded-md px-5 py-5 w-full mx-2 md:mx-auto lg:w-[70%] overflow-y-scroll lg:overflow-y-auto z-10"
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
    </section>
  )
}
