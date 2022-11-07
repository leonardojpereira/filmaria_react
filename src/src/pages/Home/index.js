import { useEffect, useState} from 'react';
import api from '../../services/api';
import "./home.css"

// URL DA API: /movie/now_playing?api_key=28fc232cc001c31e8a031f419d0a14ca&language=pt-BR
import { Link } from 'react-router-dom';

function Home(){
  const [filmes, setFilmes] = useState([]);



  useEffect(() => {

    async function loadFilmes(){
      const response = await api.get("movie/now_playing", {
        params:{
         api_key: "d970c7b3db3005dd4701df9dd32cfcc1",
         language: "pt-BR",
         page: 1,
        }
      })

      setFilmes(response.data.results.slice(0, 10));
    
 }

    loadFilmes();

  }, [])

  return(
    <div className='container'>
        <div className='lista-filmes'>
            {filmes.map((filme) => {
              return(
                <article key={filme.id}>
                    <h1 className='title'>{filme.title}</h1>
                    <img className='poster' src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title}/>
                    <Link className='link' to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
              )
            })}
        </div>
    </div>
  )
}

export default Home;