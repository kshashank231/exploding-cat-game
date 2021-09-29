import Card from "./Card"
import './main-styles.css';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from "react";
import { setDefuse, setStatus  } from './store/game'
import { updateScoreAsync } from './store/auth'

export default function CardContainer() {
    const [cards, setCards] = useState([]);
    const canDefuse =useSelector(state => state.game.defuse)
    const gameStatus = useSelector(state => state.game.gameStatus)
    const userDetails = useSelector(state => state.auth.userDetails)
    const dispatch = useDispatch()

    useEffect(() => {
        let initialcards = [{id:1, description:"Cat", src:"https://img.icons8.com/nolan/64/cat.png"},{id:2,  description:"Defuse",src:"https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-jacket-autumn-clothes-justicon-flat-justicon-2.png"},
        {id:3, description:"Shuffle",src:"https://img.icons8.com/cute-clipart/64/000000/shuffle.png"},{id:4,  description:"Exploding kitten",src:"https://img.icons8.com/emoji/96/000000/bomb-emoji.png"}]


        let currentIndex = initialcards.length,  randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [initialcards[currentIndex], initialcards[randomIndex]] = [
            initialcards[randomIndex], initialcards[currentIndex]];
        }
        console.log(initialcards)

        setCards(initialcards)
      
     }, []);

     function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function cardSelected(){
        console.log("cardSelected")
        const idx = cards.length-1
        // const newItems = cards.filter((items,idx)=> idx !== cards.length-1)
        setCards(prevItems=> {
            let newItems = JSON.parse(JSON.stringify(prevItems));
            newItems[idx]["isSelected"] = true
            console.log("newItems", newItems)
            console.log("state, canDefuse", canDefuse, ", gameStatus", gameStatus)

            return newItems
        });
        setTimeout( () => {
            let newItems = JSON.parse(JSON.stringify(cards));
            console.log("newItems", newItems)
            switch(newItems[idx]["id"]) {
                case 1:
                    newItems = newItems.filter((item,ItemIdx) => idx !== ItemIdx)
                    if(newItems.length === 0) {
                        dispatch(setStatus("won"))
                        dispatch(updateScoreAsync(userDetails))
                    }
                    break;
                case 2:
                    newItems = newItems.filter((item,ItemIdx) => idx !== ItemIdx)
                    // if(newItems.length === 0) {
                    //     dispatch(setStatus("won"))
                    // }
                    dispatch(setDefuse(true))
                    break;
                case 3:
                    if(newItems.length === 1) {
                        dispatch(setStatus("won"))
                        dispatch(updateScoreAsync(userDetails))
                    } else {
                        newItems =  [{id:1, description:"Cat", src:"https://img.icons8.com/nolan/64/cat.png"},{id:2,  description:"Defuse",src:"https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-jacket-autumn-clothes-justicon-flat-justicon-2.png"},
                        {id:3, description:"Shuffle",src:"https://img.icons8.com/cute-clipart/64/000000/shuffle.png"},{id:4,  description:"Exploding kitten",src:"https://img.icons8.com/emoji/96/000000/bomb-emoji.png"}]
                
                        dispatch(setDefuse(false))
                        newItems = shuffle(newItems)
                        
                    }
                    break;
                    
                case 4:
                    if(canDefuse) {
                        newItems = newItems.filter((item,ItemIdx) => idx !== ItemIdx)
                        dispatch(setDefuse(false))
                    } else {
                        dispatch(setStatus("gameover"))
                    }
                    break;
                default:
                    // code block
                }
                setCards(newItems)
                console.log("timeout state, canDefuse", canDefuse, ", gameStatus", gameStatus)
          }, 2000);
       



        // console.log("id", id)
    }
    const Content = ()=> {
        switch(gameStatus) {
            case "inprogress":
                return (
                    <div className="container">{
                        cards.map((card, index) => {
                            return <Card key={index} cardData={card} handleCardSelected={cardSelected}/>
                        })
                    }</div>
                ) 
            case "won":
                return (
                    <div>
                        <h1>Won</h1>
                    </div>
                ) 
            case "gameover":
                return (
                    <div>
                        <h1>Lost</h1>
                    </div>
                ) 
        }
    }

    return (
        <Content />
    );
}
