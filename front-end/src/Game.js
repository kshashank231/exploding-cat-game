import CardsContainer from "./CardsContainer"
import GameInfo from "./GameInfo";
import DialogDox from "./DialogBox";
import { useSelector, useDispatch } from 'react-redux'
import { setStatus  } from './store/game'
import { logoff } from "./store/auth"
import LeaderBoard from "./LeaderBoard";

export default function Game() {
    const gameStatus = useSelector(state => state.game.gameStatus)
    const dispatch = useDispatch()
    let retry = () => {
        console.log("retry")
        dispatch(setStatus("inprogress"))
    }
    let goHome = () => {
        console.log("goHome")
        dispatch(setStatus("inprogress"))
        dispatch(logoff(true))
    }
    let gameOverDialog = {
        title:"GAME OVER",
        btn1:"Try Again",
        btn2:"Home",
        handleBtn1: retry,
        handleBtn2: goHome
    }
    let gameWonDialog = {
        title:"WON!",
        btn1:"Play Again",
        btn2:"Home",
        handleBtn1: retry,
        handleBtn2: goHome
    }
    return (
        <>

        {gameStatus === "gameover" && <DialogDox data={gameOverDialog}/>}
        {gameStatus === "won" && <DialogDox data={gameWonDialog}/>}
        {gameStatus === "inprogress" && <div className="game-content">
        <div className="game-header"> Exploding Cat Game</div>
        <div className="game-description">
            <span className="title-text">GAME RULES:</span>
            <div className="hr"></div>
            <ul>
                <li>Select a card from Deck by clicking on the Deck.</li>
                <li>If the card drawn from the deck is a cat card, then the card is removed from the deck.</li>
                <li>If the card is exploding kitten (bomb) then the player loses the game.</li>
                <li>If the card is defusing card, then the card is removed from the deck. This card can be used to defuse one bomb that may come in subsequent cards drawn from the deck.</li>
                <li>If the card is a shuffle card, then the game is restarted and the deck is filled with 5 cards again.</li>
            </ul>
        </div>
        <div className="game-area">
            <div className="play-header"><GameInfo /></div>
            <div className="play-area">
                <CardsContainer />
                <LeaderBoard />
            </div>

            
        </div>
        
        </div>}
       
        </>
      );
}