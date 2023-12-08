import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { useContext, useEffect, useState } from "react";
import { BookContext } from "../context/BookContext";
import BookDetails from "./BookDetails.component";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BooksHome() {
  const { books }: any = useContext(BookContext);
  const [bookId, setBookId] = useState<any | null>(null);
  const [openBookDetails, setOpenBookDetails] = useState<boolean>(false);
  const [getBookDetails, setBookDetails] = useState({})
  const [refetchDelete, setRefetchDelete] = useState(false)

  const { id } = useParams();

  const getBookId = (id:any) =>{
      setBookId(id);
      setOpenBookDetails(true)
  }

useEffect(() => {
  axios.get(`http://localhost:8001/api/books/${id}`)
  .then(response => {
      console.log(response);
      setBookDetails(response.data)
      setRefetchDelete(!refetchDelete)
  })
  .catch((error) => {
      console.error(error);
      
  })
}, [setRefetchDelete])
  
  return (
    <div className="mt-40">
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {books.map((myBooks: any) => (
          <SwiperSlide className="cursor-pointer" key={myBooks._id} onClick={() => getBookId(myBooks._id)}>
            <div
       
              className="border rounded-md px-5 py-5 w-full mx-2 md:mx-auto lg:w-64 h-44 overflow-y-scroll lg:overflow-y-auto z-10"
            >
              <img
                className="absolute opacity-30 -z-10 mx-auto"
                src="/decoration.webp"
                alt=""
                width={190}
                height={190}
              />
              <div className="flex flex-col gap-3">
                <p className="text-center text-lg font-semibold opacity-75">
                  {myBooks.title}
                </p>
                <p className="text-center">{myBooks.author}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {openBookDetails && bookId !== null && <BookDetails setOpenBookDetails={setOpenBookDetails} bookId={bookId} books={books}/>}
    </div>
  );
}
