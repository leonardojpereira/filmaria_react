import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import './filme-info.css';
import api from '../../services/api';
import { toast } from 'react-toastify';

function Filme(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key: "28fc232cc001c31e8a031f419d0a14ca",
          language: "pt-BR",
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })
      .catch(()=>{
        console.log("FILME NAO ENCONTRADO")
        navigate("/", { replace: true });
        return;
      })
    }

    loadFilme();

  }, [id, navigate])


  function salvarFilme() {
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilm = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)
    if(hasFilm) {
      toast.warn('Esse filme já está na sua lista!');
        return;
  }

    filmesSalvos.push(filme);
    localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');

}

  if(loading){
    return(
      <div className="filme-info">
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }
  
  return(
    <div className="filme-info">
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avalição: <strong className='avaliacao'>{filme.vote_average} / 10</strong></strong>

      <div className="area-buttons">
        <button onClick={salvarFilme}>Salvar</button>
          <a rel='external' target="blank" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
      </div>

    </div>
  )
}

export default Filme;