import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getLeaderBoard } from './store/game'

export default function LeaderBoard() {
    const dispatch = useDispatch()
    const gameStatus = useSelector(state => state.game.gameStatus)

    const leaderBoard = useSelector(state => state.game.leaderBoard)

    const [showLeaderBoardBtn, setShowLeaderBoardBtn] = useState(true)

    let handleLeaderBoard = function() {
        setShowLeaderBoardBtn(false)
        setInterval(()=>{
            dispatch(getLeaderBoard())
            // console.log(leaderBoard)
        }, 3000);
    }

    


    return (
        <div className="game-leaderboard">
            {
                showLeaderBoardBtn && <button onClick={handleLeaderBoard}>Get Live leaderboard</button>
            }
            <div className="title-text">LEADER BOARD</div>
            <div className="hr"></div>
            {
                leaderBoard.length > 0 && <div className="leaderboard-header">
                    <div>User Name</div>
                    <div>Score</div>
                </div>
            }
            {
                leaderBoard.map((item, index)=> {
                    return <div key={index} className="leaderboard-content">
                        <div >{item.userName}</div>
                        <div >{item.score}</div>
                    </div>
                })
            }
            
        </div>
    );
}