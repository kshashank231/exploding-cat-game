import { useSelector } from 'react-redux'

export default function GameInfo() {

    const userDetails = useSelector(state => state.auth.userDetails)

    const canDefuse =useSelector(state => state.game.defuse)

    return (
        <>
            <div className="game-info">
                <div >Defuse: {canDefuse? "1":"0"}</div>
            </div>
            <div className="user-info">
                <div>SCORE: {userDetails.score}</div>
                <div className="vr"></div>
                <div className="title-text"><span className="user-name">{userDetails.userName}</span></div>
            </div>
        </>
       
    );
}