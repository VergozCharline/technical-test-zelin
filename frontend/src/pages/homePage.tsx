import BooksHome from "../components/BooksHome.component";
import Header from "../components/Header.component";
import NewBook from "../components/NewBook.component";
import Footer from "../components/Footer.component";

type Props = {
  setOpenNewBook: (value: boolean) => void;
  openNewBook: boolean;
};

export default function HomePage({
  setOpenNewBook,
  openNewBook,
}: Props) {
  return (
    <div className="bg-gradient-to-b from-black to-slate-900">
      <Header setOpenNewBook={setOpenNewBook} />
      <BooksHome />
      {openNewBook && <NewBook setOpenNewBook={setOpenNewBook} />}
      <Footer />
    </div>
  );
}
