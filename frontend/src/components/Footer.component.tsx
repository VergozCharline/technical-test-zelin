import { Link } from "react-router-dom";

type Props = {
  setOpenSearch: (value: boolean) => void;
  setOpenNewBook: (value: boolean) => void;
}


export default function Footer({ setOpenNewBook, setOpenSearch }:Props) {
  return (
    <footer className="relative bottom-0 right-0 left-0 mt-36">
      <div className="flex items-center justify-evenly">

     <Link to="/" aria-label="retour à la page d'accueil">
          <img className="scale-150" src="/logo.webp" alt="Logo" width={100} height={100} />
        </Link>
        <div>
          <ul className="flex gap-10 font-roboto">
            <li onClick={() => setOpenNewBook(true)} className="cursor-pointer hover:text-hoverPurple hover:scale-110 hover:transition-all">Ajouter un livre</li>
            <li onClick={() => setOpenSearch(true)} className="cursor-pointer hover:text-hoverPurple hover:scale-110 hover:transition-all">Rechercher</li>
          </ul>
      </div>
        </div>
    </footer>
  )
}
