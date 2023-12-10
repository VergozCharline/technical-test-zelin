import BooksHome from "../components/BooksHome.component";
import Header from "../components/Header.component";
import NewBook from "../components/NewBook.component";
import Footer from "../components/Footer.component";

type Props = {
  books: any;
  setOpenNewBook: (value: boolean) => void;
  openNewBook: boolean;
  setBooks:any;
};

export default function HomePage({
  setOpenNewBook,
  openNewBook,
}: Props) {
  return (
    <div>
      <Header setOpenNewBook={setOpenNewBook} />
      <BooksHome />
      {openNewBook && <NewBook setOpenNewBook={setOpenNewBook} />}
      <Footer setOpenNewBook={setOpenNewBook} />
    </div>
  );
}
