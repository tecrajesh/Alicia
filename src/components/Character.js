import React  from 'react';
export const Character = ({result, handleClick}) => {
    
    
    return (
        <tr className="row" onClick={()=>handleClick(result)}>
            <td scope="row">{result.name}</td>
            <td>{result?.gender}</td>
            <td>{result?.homeworld}</td>
        </tr>
    )
}