import React from 'react';

export const CharacterDetailView = ({ people }) => {

  if (!people) return <> Click any character to view Detail</>


  return (

    <div className="cards-list grid-item">
      <div className="card people">
      <div className="card_title ">
        <p>Character</p>
      </div>
      <div className="card_content">
        <h3> {people?.name}</h3>
        <p>{people?.gender}</p>
        <p><strong>Hair Color(s): </strong>{people?.hair_color}</p>
        <p><strong>Eye Color: </strong> {people?.eye_color}</p>
      </div>  
      </div>  
      <div className="card films">
      <div className="card_title ">
          <p>Film</p>
        </div>
        <ol>{people?.films?.map(film => <li>{film}</li>)}</ol>
      </div>
      <div className="card planet">
      <div className="card_title ">
          <p>Planet</p>
        </div>
        <p className="card_content"> {people?.homeworld}</p>
      </div>
      <div className="card startship">
      <div className="card_title ">
          <p>Startship</p>
        </div>
        <ol>{people?.starships?.map(starship => <li>{starship}</li>)}</ol>
      </div>
    </div>


  )
}
