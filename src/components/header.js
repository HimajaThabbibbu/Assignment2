import React from 'react'

import "./header.css"

export const Header = ({ clickinx, xPlaying,winner}) => {
    const inx=['A1','A2','A3','B1','B2','B3','C1','C2','C3']
    const out = inx[clickinx]

  return (
    <div>
    

    <div>
        <h1 className='title'>Tic-Tac-Toe</h1><br></br>
    </div>

    <div className="header">
      
      <span className="Clickid">Clicked ID : {out}</span><br></br>
      <span className="Player">Current Player : {xPlaying}</span><br></br>
      <span className="winner">Winner :{winner}</span>
    </div>
    </div>
   
  );
}



    

