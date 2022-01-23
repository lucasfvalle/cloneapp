import React, {useEffect, useState} from 'react';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Tmdb from './Tmdb';
import './App.css';



export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  useEffect(()=>{
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando filme em destaque (featured)
      let originals = list.filter(i=>i.slug == 'originals'); // Filtro para pegar somente originais netflix através do slug
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1)); // "Sorteando" um filme/serie aleatório

      let chosen = originals[0].items.results[randomChosen]; // Registrando o escolhido
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');

      setFeaturedData (chosenInfo);
    }
    loadAll();
  }, []);

  return(
    <div className="page">
    
    {featuredData &&
      <FeaturedMovie item={featuredData} />
    }

    <section className="lists">
      {movieList.map((item, key) => (
       <MovieRow key={key} title={item.title} items={item.items} />
      ))

      }
    </section>
    </div>
  )
}