import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setUserDetailsAsync } from './store/auth'

export default function Home() {

    const [username, setUserName] = useState("")
    const dispatch = useDispatch()
    let handleLogin = ()=> {
        console.log("sdf", username)
        if(!username) return
        dispatch(setUserDetailsAsync(username))
    }
    let handleInputChange = (event)=>{
        setUserName(event.target.value)
    }
    let serviceCall = ()=> {
        console.log("env", process.env.NODE_ENV)
    }
    return (
        <>
         <div className="home-game-header"> Exploding Cat Game</div>
         <div className="home">
            <div className="home-overlay"></div>
            <div className="home-content">
                <div className="form-group">
                    <label>
                        <span>Username</span>
                        <input type="text" value={username} onChange={handleInputChange} placeholder="Enter User Name"/>
                    </label>
                    <button onClick={handleLogin}>Start Game</button>
                </div>
            </div>
           
        </div>
        
        </>
      
        
    );
}