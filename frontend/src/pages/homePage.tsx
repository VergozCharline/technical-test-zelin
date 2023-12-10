import BooksHome from "../components/BooksHome.component";
import Header from "../components/Header.component";
import NewBook from "../components/NewBook.component";
import Footer from "../components/Footer.component";

type Props = {
  books: any;
  setOpenNewBook: (value: boolean) => void;
  openNewBook: boolean;
};

export default function HomePage({
  books,
  setOpenNewBook,
  openNewBook,
}: Props) {
  return (
    <div>
      <Header setOpenNewBook={setOpenNewBook} />
      <BooksHome books={books} />
      {openNewBook && <NewBook setOpenNewBook={setOpenNewBook} books={books} />}
      <Footer setOpenNewBook={setOpenNewBook} />
    </div>
  );
}
