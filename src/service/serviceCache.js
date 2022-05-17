import {getResultsByType} from "./generic"

let people = {};
let films = {}
let planet = {}
let startships ={};

export const getPlanets = (page=1) => getResultsByType("planets","", page);

export const getPlanetById = (id) => {
    if(!planet[id]) {
        const response = getResultsByType("planets",id);
        planet[id] = response;
    } 
    return planet[id]
}  

export const getFilms = (page=1) => getResultsByType("films","", page);


export const getFilmsById = async (id) => {
    if(!films[id]) {
            const response = await getResultsByType("films", id);
            films[id] = response;
        } 
    return films[id];
}

export const getStartShipsById = async (id) => {
    if(!startships[id]) {
            const response = await getResultsByType("starships", id);
            startships[id] = response;
        } 
    return startships[id];
}

export const getPeopleByPage = (page = 1) => {
  const people =  getResultsByType("people","", page);
  return people;
}    

