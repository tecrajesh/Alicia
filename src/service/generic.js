import { useMemo } from "react";

/*
//sample
const apiMap  = {
  "films": "https://swapi.dev/api/films/",
  "people": "https://swapi.dev/api/people/",
  "planets": "https://swapi.dev/api/planets/",
  "species": "https://swapi.dev/api/species/",
  "starships": "https://swapi.dev/api/starships/",
  "vehicles": "https://swapi.dev/api/vehicles/"
}
*/

const propertyMap = {

  "films" : "",
  "planet" : "homeworld",
  "people" :"residents"
}


const PROD_URL = "https://swapi.dev/api";

const getURL=(type, params, page=1) =>  {
    let baseURL = `${PROD_URL}/${type}`;
    return params>0 ?  `${baseURL}/${params}/?page=${page}` : `${baseURL}/?page=${page}` ;
}


export const getResultsByType  = async (type, params=0,page = 1) => { 
    return (async () => {
    const req = await fetch(getURL(type, params, page));
    const response = await req.json();
    if(params>0)
    return response;
    else 
        return {results:response.results, prev:response.previous, next: response.next} ;   
  })()
} 

export const getResultsByProps= async (type, id="", property="") => { 
  
   return (async () => {
        const req = await getResultsByType(type,id);
        const response = await req.json();
      
        const allDataPromises = response.results.map(async (characterDetails) => {
          
        const itemReq =  await fetch(characterDetails[property]);
        const planetResponse = await itemReq.json();
        return {
        people: characterDetails,
        planet: planetResponse,
        };
        });
      
        const allData = await Promise.all(allDataPromises);
        return allData;
      })();
}