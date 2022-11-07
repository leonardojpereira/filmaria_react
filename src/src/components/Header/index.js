import './header.css';
import { Link } from 'react-router-dom'
import { GiFilmProjector } from 'react-icons/gi';
import { AiFillStar } from 'react-icons/ai'

function Header() {
  return (
    <header>
      <div className='container'>
        <Link className="logo" to="/">
          <span className='icon'><GiFilmProjector /></span>
          Filmaria
        </Link>
      </div>
      <div className='container-fav'>
      <Link className="logo-fav" to="/favoritos">
        <span className='icon-fav'> <AiFillStar/> </span>
        Favoritos
      
      </Link>
      </div>
    
    </header>
  )
}

export default Header;