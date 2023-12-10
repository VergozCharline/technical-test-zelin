import { Link } from "react-router-dom";

type Props = {
  setOpenNewBook: (value: boolean) => void;
};

export default function Header({ setOpenNewBook }: Props) {
  return (
    <header className="fixed top-0 w-full shadow-md z-50 bg-white">
      <nav className="flex flex-row justify-around items-center">
        <Link to="/" aria-label="retour à la page d'accueil">
          <img
            className="scale-150"
            src="/logo.webp"
            alt="Logo"
            width={100}
            height={100}
          />
        </Link>
        <div>
          <ul className="flex gap-10 font-roboto">
            <li
              onClick={() => setOpenNewBook(true)}
              className="cursor-pointer hover:text-hoverPurple hover:scale-110 hover:transition-all"
            >
              Ajouter un livre
            </li>
            <Link to="/search">
              <li className="cursor-pointer hover:text-hoverPurple hover:scale-110 hover:transition-all">
                Rechercher
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
}
