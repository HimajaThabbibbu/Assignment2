import React, { useState } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import {Header} from "./components/header";
//import {Title} from "./components/header";
import './App.css';


const App = () => {

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null))
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);
  const [player,setplayer] = useState()
  const [clickid,setID]=useState(setBoard.idx);
  const [won,setwon]=useState("?");
  var current;
  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        setID(boxIdx);
        if(xPlaying){
          current = "X";
          
        }
        else{
          current = "O"
        }
        setplayer(current)
        return current;
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore })
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore })
      }
    }

    // Step 3: Change active player
    setXPlaying(!xPlaying);
    //Header(boxIdx,xPlaying,{checkWinner})
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        setwon(board[x]);
        return board[x];
      }
    }
    let flag = 0;
		for(let i= 0;i<9;i++){
			if (board[i] === "X"|| board[i] === "O" ){
				continue;		
			}
			else{
				flag=1;
				break;
			}	
		}
    if( flag === 0){
      setwon("Its a Draw!!");
      setGameOver(true);
    }

  }

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    setwon("?");
  }

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      <Header clickinx={clickid} xPlaying={player}  winner={won}/>
    </div>
  );
}

export default App;
