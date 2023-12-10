import { Link } from "react-router-dom";

type Props = {
  setOpenNewBook: (value: boolean) => void;
}


export default function Footer({ setOpenNewBook }:Props) {
  return (
    <footer className="relative bottom-0 right-0 left-0 mt-36">
      <div className="flex items-center justify-evenly">

     <Link to="/" aria-label="retour à la page d'accueil">
          <img className="scale-150" src="/logo.webp" alt="Logo" width={100} height={100} />
        </Link>
        <div>
          
      </div>
        </div>
    </footer>
  )
}
