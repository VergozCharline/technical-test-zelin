import { useContext, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import BookDetails from "./BookDetails.component";
import { BookContext, BookContextProps } from "../context/BookContext";

export default function BooksHome() {
  const { books }: BookContextProps = useContext(BookContext);
  const [bookId, setBookId] = useState(null);
  const [openBookDetails, setOpenBookDetails] = useState<boolean>(false);

  const getBookId = (id: any) => {
    setBookId(id);
    setOpenBookDetails(true);
  };

  return (
    <div className="pt-40 px-5 min-h-[100vh]">
      <>
        <h2 className="pl-5 mt-7 mb-5 text-2xl text-textPurple border-b border-colorBorder pb-2 font-bold opacity-75">
          Mes Romans
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            820: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1800: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-72"
        >
          {books
            .filter((genreBooks: any) => genreBooks.genre === "Roman")
            .map((myBooks: any) => (
              <SwiperSlide
                className="cursor-pointer"
                key={myBooks._id}
                onClick={() => getBookId(myBooks._id)}
              >
                <div className=" mx-2 md:mx-auto z-10">
                  <img
                    className="rounded-md mx-auto min-h-[14.5rem] max-h-[14.5rem]"
                    src={myBooks.picture}
                    alt=""
                    width={150}
                    height={150}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
      <>
        <h2 className="pl-5 mt-7 mb-5 text-2xl text-textPurple border-b border-colorBorder pb-2 font-bold opacity-75">
          Mes Thrillers
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            820: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1800: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-72"
        >
          {books
            .filter((genreBooks: any) => genreBooks.genre === "Thriller")
            .map((myBooks: any) => (
              <SwiperSlide
                className="cursor-pointer"
                key={myBooks._id}
                onClick={() => getBookId(myBooks._id)}
              >
                <div className="md:mx-auto overflow-y-scroll lg:overflow-y-auto z-10">
                  <img
                    className="rounded-md mx-auto min-h-[14.5rem] max-h-[14.5rem]"
                    src={myBooks.picture}
                    alt=""
                    width={150}
                    height={150}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
      <>
        <h2 className="pl-5 mt-7 mb-5 text-2xl text-textPurple border-b border-colorBorder pb-2 font-bold opacity-75">
          Mes Livres Fantaisie
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            820: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1800: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-72"
        >
          {books
            .filter((genreBooks: any) => genreBooks.genre === "Fantaisie")
            .map((myBooks: any) => (
              <SwiperSlide
                className="cursor-pointer"
                key={myBooks._id}
                onClick={() => getBookId(myBooks._id)}
              >
                <div className="md:mx-auto z-10">
                  <img
                    className="rounded-md mx-auto min-h-[14.5rem] max-h-[14.5rem]"
                    src={myBooks.picture}
                    alt=""
                    width={150}
                    height={150}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
      <>
        <h2 className="pl-5 mt-7 mb-5 text-2xl text-textPurple border-b border-colorBorder pb-2 font-bold opacity-75">
          Mes Autres Livres
        </h2>
        <Swiper
          slidesPerView={2}
          spaceBetween={10}
          breakpoints={{
            820: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
            1800: {
              slidesPerView: 9,
              spaceBetween: 10,
            },
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper h-72"
        >
          {books
            .filter(
              (genreBooks: any) =>
                genreBooks.genre !== "Fantaisie" &&
                genreBooks.genre !== "Thriller" &&
                genreBooks.genre !== "Roman"
            )
            .map((myBooks: any) => (
              <SwiperSlide
                className="cursor-pointer"
                key={myBooks._id}
                onClick={() => getBookId(myBooks._id)}
              >
                <div className="md:mx-auto z-10">
                  <img
                    className="rounded-md mx-auto min-h-[14.5rem] max-h-[14.5rem]"
                    src={myBooks.picture}
                    alt=""
                    width={150}
                    height={150}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
      {openBookDetails && (
        <BookDetails setOpenBookDetails={setOpenBookDetails} bookId={bookId} />
      )}
    </div>
  );
}
