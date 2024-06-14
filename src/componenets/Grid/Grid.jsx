import Card from "../Card/Card";
import { useState } from "react";
import "./Grid.css";
import IsWinner from "../../helper/IsWinner";


function Grid({numberOfCards}){
    const [board,setBoard]= useState(Array(numberOfCards).fill(""));
    const [turn,setTurn]= useState(true);
    const [winner,setWinner]=useState(null);

    function play(index){
        console.log("move played",index);
        if(turn == true){
            board[index]="O";
        }else{
            board[index]="X";
        }
        const win=IsWinner(board,turn ? "O":"X")
        if(win){
            setWinner(win);
        }
        setBoard([...board]);
        setTurn(!turn);
    }
    function reset(){
        setBoard(Array(numberOfCards).fill(""));
        setWinner(null);
        setTurn(true);
    }

    return(
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="text-highlight">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}>Reset Game</button>
                    </>
                )
            }
            <h1 className="text-highlight">Current turn : {(turn) ? "O" : "X"}</h1>
            <div className="grid" >
                {board.map((el,idx)=>{
                    return <Card gameEnd={winner ? true : false} onPlay={play} player={el} key={idx} index={idx}/>
                })}
            
            </div>
        </div>
    )
}
export default Grid;