import React, {useState, useEffect} from 'react';
import { Character } from "../components/Character"

export const  ListView = ({results, columns, handleClick, handleNext, handlePrev,page}) => {
 
  const renderHeadings = () => {
      return (
          <thead>
              <tr>
                { columns?.length &&  columns.map(column=> <th scope="col">{column}</th>)}
              </tr>
          </thead>
      )
  }
  const renderContent = ()=> {
    if(results.length == 0) return <h1> Loading ...</h1>
    return (
     <tbody>
          { 
           results?.length && results.map(result =><Character handleClick={handleClick} key={result.url} result={result}/>) 
          } 
      </tbody> 
        ) 
 }
 return (
      <div className="grid-item">
      
        <table id = "character">
              {renderHeadings()}
              {renderContent()}
        </table>
        <p> Page {page}</p>
        <button className="curve" onClick={handlePrev}>Prev</button>
        <button className="curve" onClick={handleNext}>Next</button>
  </div>
 )
}