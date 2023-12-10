import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UpdateBook from "./UpdateBook.component";
import { BookContext } from "../context/BookContext";
import Swal from "sweetalert2";

type Props = {
  setOpenBookDetails: (value: boolean) => void;
  books?: any;
  bookId: any;
};

export default function BookDetails({
  setOpenBookDetails,
  bookId,
}: Props) {
  const [oneBookID, setOneBookID] = useState<any>(null);
  const [openUpdateBook, setOpenUpdateBook] = useState(false);
  const { books, setBooks }:any = useContext(BookContext);

  useEffect(() => {
    if (oneBookID) {
      Swal.fire({
        icon: "warning",
        title: "Êtes-vous sur de vouloir supprimer ce livre ?",
        showDenyButton: true,
        confirmButtonText: "Oui",
        denyButtonText: "Non"
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8001/api/books/${oneBookID}`)
            .then((response) => {
              setOpenBookDetails(false);
              setBooks((prevBooks: any) => {
                return prevBooks.filter((book: any) => book._id !== oneBookID);
              });
              Swal.fire("Le livre est bien supprimé", "", "success");
            })
            .catch((error) => {
              console.error("Delete error: ", error);
              Swal.fire("Une erreur s'est produite lors de la suppression du livre", "", "error");
            });
        }
      });
    }
  }, [oneBookID, setOpenBookDetails, setBooks]);
  


  return (
    <section className="mt-36 lg:mx-20">
      <div className="fixed top-0 right-0 left-0 h-screen flex justify-center items-center backdrop-blur-md z-50">
        {!openUpdateBook && <button
          type="button"
          className="absolute right-7 lg:right-[18%] top-12 lg:top-[10%] border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple z-50  bg-white md:bg-transparent"
          onClick={() => setOpenBookDetails(false)}
        >
          X
        </button>}
        <div className="flex flex-wrap gap-5 w-full ">
          {books
            .filter((myBooks: any) => myBooks._id === bookId)
            .map((myBooks: any) => (
              <div
                key={myBooks._id}
                className="bg-white border rounded-md px-5 py-5 w-full mx-2 md:mx-auto lg:w-[70%] overflow-y-scroll lg:overflow-y-auto z-10 "
              >
                {openUpdateBook ? (
                  <UpdateBook
                    setOpenUpdateBook={setOpenUpdateBook}
                    books={books}
                    bookId={bookId}
                  />
                ) : (
                  <>
                      <p className="text-sm opacity-75 text-end">Livre ajouté le : {new Date(myBooks.publicationDate).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                      })}</p>
                      {myBooks.lastModification !== null &&   <p className="text-sm opacity-75 text-end">Dernière modification le : {new Date(myBooks.lastModification).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                      })}</p>}
                     
                    <div className="flex items-center justify-evenly mb-10">
                      <img
                        className="rounded-md max-md:w-20 max-md:mr-2"
                        src={myBooks.picture}
                        alt=""
                        width={200}
                        height={200}
                      />

                      <div className="w-2/3">
                        <p className="text-xl lg:text-3xl font-semibold opacity-75 text-center mt-5">
                          {myBooks.title}
                        </p>
                        <p className="text-center lg:text-lg italic mb-5 lg:mb-20">
                          {myBooks.author}
                        </p>
                        <div className="flex flex-col md:flex-row md:mt-20 justify-evenly md:mx-20">
                          <div className="flex gap-4 items-center">
                            <p className="text-sm lg:text-md font-semibold self-center opacity-60">
                              Date de publication :
                            </p>
                            <p>{myBooks.date}</p>
                          </div>
                          <div className="flex gap-4 items-center">
                            <p className="text-sm lg:text-md font-semibold self-center opacity-60">
                              Genre :
                            </p>
                            <p>{myBooks.genre}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-[70%] mx-auto lg:mt-10 border px-2 md:px-10 py-3 md:py-7 rounded-xl relative">
                      <div className="flex gap-4">
                        <p className="text-sm lg:text-md font-semibold opacity-60 mb-5">
                          Note :
                        </p>
                        <p>{myBooks.rate} / 5</p>
                      </div>
                      <p className="text-sm lg:text-md font-semibold opacity-60 mb-2 md:mb-5">
                        Commentaire :
                      </p>
                      <p className="max-h-40 overflow-y-scroll">{myBooks.note}</p>
                    </div>
                    <button
                      type="button"
                      className="border rounded-full px-3 py-1 mt-10 mr-5 hover:text-white hover:bg-hoverPurple z-50 bg-white md:bg-transparent"
                      onClick={() => setOneBookID(bookId)}
                    >
                      Supprimer
                    </button>
                    {!openUpdateBook && (
                      <button
                        type="button"
                        className="border rounded-full px-3 py-1 hover:text-white hover:bg-hoverPurple z-50  bg-white md:bg-transparent"
                        onClick={() => setOpenUpdateBook(true)}
                      >
                        Modifier
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
