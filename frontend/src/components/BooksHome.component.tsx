import { useContext, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import BookDetails from "./BookDetails.component";
import { BookContext } from "../context/BookContext";


export default function BooksHome() {
  const { books }:any = useContext(BookContext);
  const [bookId, setBookId] = useState(null);
  const [openBookDetails, setOpenBookDetails] = useState<boolean>(false);

  const getBookId = (id:any) =>{
      setBookId(id);
      setOpenBookDetails(true)
  }
 
  return (
    <div className="mt-40 h-[100vh] mx-5">
        <>
      <h2 className="mx-5 mt-7 mb-2 text-2xl italic text-purple-950">Mes Romans</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          820: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1800: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Pagination]}
        className="mySwiper mb-10"
      >
        {books.filter((genreBooks:any) => genreBooks.genre === "Roman").map((myBooks: any) => (
          <SwiperSlide className="cursor-pointer" key={myBooks._id} onClick={() => getBookId(myBooks._id)}>
            <div
       
              className=" mx-2 md:mx-auto w-52 md:w-max lg:w-72 h-64 overflow-y-scroll lg:overflow-y-auto z-10"
            >
              <img
                className="rounded-md absolute mx-auto"
                src={myBooks.picture}
                alt=""
                width={150}
                height={150}
              />
              {/* <div className="flex flex-col gap-3">
                <p className="text-center text-lg font-semibold opacity-75">
                  {myBooks.title}
                </p>
                <p className="text-center">{myBooks.author}</p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </>
      <>
      <h2 className="mx-5 mt-7 mb-2 text-2xl italic text-purple-950">Mes Thrillers</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          820: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1800: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Pagination]}
        className="mySwiper mb-10"
      >
        {books.filter((genreBooks:any) => genreBooks.genre === "Thriller").map((myBooks: any) => (
          <SwiperSlide className="cursor-pointer" key={myBooks._id} onClick={() => getBookId(myBooks._id)}>
            <div
              className=" mx-2 md:mx-auto w-52 md:w-max lg:w-72 h-64 overflow-y-scroll lg:overflow-y-auto z-10"
            >
              <img
                className="rounded-md absolute mx-auto"
                src={myBooks.picture}
                alt=""
                width={150}
                height={150}
              />
              {/* <div className="flex flex-col gap-3">
                <p className="text-center text-lg font-semibold opacity-75">
                  {myBooks.title}
                </p>
                <p className="text-center">{myBooks.author}</p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </>
      <>
      <h2 className="mx-5 mt-7 mb-2 text-2xl italic text-purple-950">Mes Livres Fantaisie</h2>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        breakpoints={{
          820: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          1800: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        pagination={{
          clickable: true,
        }}
        
        modules={[Pagination]}
        className="mySwiper mb-10"
      >
        {books.filter((genreBooks:any) => genreBooks.genre === "Fantaisie").map((myBooks: any) => (
          <SwiperSlide className=" cursor-pointer" key={myBooks._id} onClick={() => getBookId(myBooks._id)}>
            <div
       
              className=" mx-2 md:mx-auto w-52 md:w-max lg:w-72 h-64 overflow-y-scroll lg:overflow-y-auto z-10"
            >
              <img
                className="rounded-md absolute mx-auto"
                src={myBooks.picture}
                alt=""
                width={150}
                height={150}
              />
              {/* <div className="flex flex-col gap-3">
                <p className="text-center text-lg font-semibold opacity-75">
                  {myBooks.title}
                </p>
                <p className="text-center">{myBooks.author}</p>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </>
      {openBookDetails && <BookDetails setOpenBookDetails={setOpenBookDetails} bookId={bookId} books={books} />}
    </div>
  );
}
