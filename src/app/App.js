import React, {useState, useEffect} from 'react';
import { getFilmsById, getPeopleByPage, getStartShipsById, getPlanetById } from '../service/serviceCache';
import { ListView } from '../container/ListView';
import { CharacterDetailView } from '../container/CharacterDetailView';
/**
 * App: main component of project
 * @returns
 */
const App = () => {
  
  const [results, setResults] = useState([]);
  const [detailView, setDetailView] = useState({})
  const columns = ["Name", "Gender", "Home Planet"]
  const [isLoading, setIsLoading] = useState(false);  
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const handleNext = () => {
    if(next) setPage(page+1)
  }

  const handlePrev = () => {
    console.log("handlePrev", prev);  
    if(prev) setPage(page-1) 
  }

  useEffect(()=> {
    setDetailView({});
    getData()
  }, [page]);

  const getIdByURL = (url) => url.split("/")[5]; 

  const handleClick = (character) =>  { 
    setIsLoading(true);
    (async() => {
          const tempFilms = [], tempstarShips = [];
          const filmPromises = character.films.map(async (film) => {
          const filmObject = await getFilmsById(getIdByURL(film));
          
          tempFilms.push(filmObject.title)
          return tempFilms;
          });
          const starshipsPromises = character.starships.map(async (starship) => {
          const starshipsObject = await getStartShipsById(getIdByURL(starship));
          tempstarShips.push(starshipsObject.name)
            
          return tempstarShips;
          });

          await Promise.all(filmPromises, starshipsPromises);
          setDetailView( Object.assign({}, character , {films: [...tempFilms]}, 
                                                       {starships: [...tempstarShips]}));
      })();
      setIsLoading(false);
  }
  
  const getData=()=> {
    setIsLoading(true);
    (async() => {
          const {results, prev, next} = await getPeopleByPage(page);
          const allDataPromises = results.map(async (people) => {
          //const itemReq =  await fetch(people.homeworld);
          //const planetResponse = await itemReq.json();
          
          const plantsObject = await getPlanetById(getIdByURL(people.homeworld));
          return Object.assign( {}, people, { homeworld: plantsObject.name})
          });
          const allData = await Promise.all(allDataPromises);
          setResults(allData);
          setPrev(prev);
          setNext(next);
      })();
      setIsLoading(false);

  }
  useEffect(() => { 
    getData()
  }, [])

  return  (
    <div className="main">
         <ListView handleClick={handleClick} handlePrev={handlePrev} 
          page={page} handleNext={handleNext} columns={columns} results={results}/>
         <CharacterDetailView people={detailView}/>
    </div>
  ) 
}
export default App;
